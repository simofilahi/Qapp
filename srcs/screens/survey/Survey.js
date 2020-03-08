import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  List,
  Container,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Content,
} from 'native-base';
import MyHeader from '../header/Header';
import SubmitFooter from '../footer/SubmitFooter';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
var RNFS = require('react-native-fs');

export default class SurveyScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      response: null,
      uuid: '',
      row: null,
      qrcodeData: null,
      rowid: null,
      isConnected: false,
      isInternetReachable: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // update checked flag to each options of question in all parts;
  updateOptionsInPart = (partId, QuestionId, Answer) => {
    try {
      this.setState(
        {
          data: {
            ...this.state.data,
            parts: this.state.data.parts.map((elem, index) => {
              if (elem.id === partId) {
                return {
                  ...elem,
                  variables: elem.variables.map(elem => {
                    if (
                      (elem.type === 4 ||
                        elem.type === 5 ||
                        elem.type === 6 ||
                        elem.type === 7 ||
                        elem.type === 8 ||
                        elem.type === 9 ||
                        elem.type === 10 ||
                        elem.type === 11) &&
                      elem.id === QuestionId
                    ) {
                      elem['options'] = [Answer];
                      return elem;
                    } else if (
                      (elem.type === 0 || elem.type === 1 || elem.type === 3) &&
                      elem.id === QuestionId
                    ) {
                      elem['options'] = elem['options'].map(elem => {
                        return {
                          ...elem,
                          checked: false,
                        };
                      });
                      if (Answer.length > 0) {
                        Answer.forEach(element => {
                          elem['options'] = elem['options'].map(elem => {
                            if (element.id === elem.id) {
                              return {
                                ...elem,
                                checked: true,
                              };
                            } else return elem;
                          });
                        });
                      }
                      return elem;
                    } else if (elem.type === 2 && elem.id === QuestionId) {
                      elem['options'] = elem['options'].map(elem => {
                        return {
                          ...elem,
                          checked: false,
                        };
                      });
                      elem['options'] = elem['options'].map(elem => {
                        if (elem.id == Answer.value) {
                          return {
                            ...elem,
                            checked: true,
                          };
                        }
                        return elem;
                      });
                      return elem;
                    } else return elem;
                  }),
                };
              } else return elem;
            }),
          },
        },
        () => {
          // this.state.data.parts.map(elem => {
          //   elem.variables.map(elem => {
          //     console.log('variables ==> ', elem);
          //   });
          // });
          // console.log('******************************');
          // console.log('******************************');
          // console.log('data in Change ', JSON.stringify(this.state.data.parts));
          // console.log('******************************');
          // console.log('******************************');
        },
      );
    } catch {}
  };

  // add checked flag to each options of question in all parts;
  AddParamToOptions = async data => {
    let promise = new Promise((resolve, reject) => {
      resolve(
        data.parts.map(elem => {
          return {
            ...elem,
            variables: elem.variables.map(elem => {
              var arr = [];
              if (elem.type === 4) {
                arr = [false];
              } else if (
                elem.type === 7 ||
                elem.type === 8 ||
                elem.type === 9 ||
                elem.type === 10 ||
                elem.type === 11
              ) {
                arr = [];
              } else arr = [''];
              //  i added above line just to escape front end error
              return {
                ...elem,
                // options:
                //   elem.options.length > 0
                //     ? elem.options.map((elem, index) => {
                //         return {
                //           id: index,
                //           value: elem,
                //           checked: false,
                //         };
                //       })
                //     : arr,
                options:
                  elem.type === 0 ||
                  elem.type === 1 ||
                  elem.type === 2 ||
                  elem.type === 3
                    ? elem.options.map((elem, index) => {
                        return {
                          id: index,
                          value: elem,
                          checked: false,
                        };
                      })
                    : arr,
              };
            }),
            submited: false,
          };
        }),
      );
    });
    let parts = await promise;
    return parts;
  };

  // add answer and row_id each time when botton of submited pressed
  PartOnSubmit = async (pageId, partAnswer) => {
    const {row} = this.state;
    const {parts} = this.state.data;
    return new Promise((resolve, reject) => {
      this.setState(
        {
          data: {
            ...this.state.data,
            parts: parts.map(elem => {
              if (elem.id === pageId) {
                return {
                  ...elem,
                  // adding part_id and variables to each page submited
                  answers: {id_part: pageId, variables: partAnswer},
                  submited: true,
                };
              } else return elem;
            }),
            row: row,
          },
        },
        () => {
          // console.log("all data ==> ", JSON.stringify(this.state.data))
          this._storeData()
            .then(res => resolve('success'))
            .catch(err => reject('failed'));
        },
      );
    });
  };

  UNSAFE_componentWillMount() {
    const template = this.props.navigation.getParam('data', () => false);
    const scanner = this.props.navigation.getParam('scanner', () => false);
    const flag = this.props.navigation.getParam('flag', () => false);

    console.log('template ======> ', JSON.stringify(template));
    this.setState(
      {
        // here it was another code
        data: {...template.data, sent: template.sent},
        uuid: template.data.uuid,
        scanner: scanner,
        qrcodeData: template.qrcodeData,
        rowid: template.rowid,
        row:
          template.answers !== undefined && template.answers.row !== undefined
            ? template.answers.row
            : null,
      },
      () => {
        // console.log('====> this.state.data', this.state.data);
        if (flag === 1) {
          this.AddParamToOptions(template.data).then(res => {
            this.setState({
              // here it was another code
              data: {...this.state.data, parts: res},
              uuid: template.data.uuid,
              scanner: scanner,
              qrcodeData: template.qrcodeData,
              rowid: template.rowid,
              row:
                template.answers !== undefined &&
                template.answers.row !== undefined
                  ? template.answers.row
                  : null,
            });
          });
        }
      },
    );
    // here it was another code
  }

  // this func assign false to sent variable it's mean the data not sented to the backend so we should to store data in local storage
  updateSentValue = () => {
    this.setState(
      {
        data: {...this.state.data, sent: false},
      },
      () => {
        console.log('sent ==> ', this.state.data.sent);
        // console.log(
        //   'all data ==============> ',
        //   JSON.stringify(this.state.data),
        // );
      },
    );
  };

  // store data into local storage
  _storeData = () => {
    return new Promise((resolve, reject) => {
      const {rowid, data, qrcodeData, row} = this.state;
      const name = '/file_' + rowid + '.txt';
      const path = RNFS.DocumentDirectoryPath + name;
      const template = {data, rowid, qrcodeData};
      let answers = [];
      // create a global answer array and push it to a file
      template.data.parts.map((elem, index) => {
        if (elem.answers !== undefined) {
          if (answers.length > 0) answers = [...answers, elem.answers];
          else if (answers.length == 0) answers = [elem.answers];
        }
      });
      const res = {
        ...template,
        answers: {row: row, allpartanswers: answers},
      };
      const string = JSON.stringify(res);
      RNFS.writeFile(path, string, 'utf8')
        .then(success => {
          resolve('succes');
        })
        .catch(err => {
          reject('failed');
        });
      this.setState({loading: false});
    });
  };

  // update row with new row value that coming from backend side
  updateRow = row => {
    if (row !== null && row !== undefined) {
      this.setState({
        row: row,
      });
    }
  };

  // call this func when Done button pressed
  allDone = () => {
    const {rowid, data} = this.state;
    const {navigate} = this.props.navigation;
    var name = '/file_' + rowid + '.txt';
    var path = RNFS.DocumentDirectoryPath + name;

    // dont forget to check if file alerday exist and filled with old data
    if (data.sent === true) {
      RNFS.unlink(path, 'utf8')
        .then(res => {
          this.setState({loading: false});
          navigate('HomeScreen', {
            TabId: 1,
            flag: 1,
          });
        })
        .catch(err => {
          navigate('HomeScreen', {
            TabId: 1,
            flag: 1,
          });
        });
    } else {
      navigate('HomeScreen', {
        TabId: 1,
        flag: 1,
      });
    }
  };

  updateLoading = () => {
    this.setState({loading: false});
  };

  _renderRow = (item, index, navigate, uuid, row, qrcodeData) => {
    return (
      <Card
        key={index}
        style={{marginLeft: 15, marginRight: 15, marginTop: '1%'}}>
        <CardItem
          header
          bordered
          button
          onPress={() => {
            this.setState({loading: true});
            navigate('SurveyItemScreen', {
              updateRow: this.updateRow,
              updateOptionsInPart: this.updateOptionsInPart,
              PartOnSubmit: this.PartOnSubmit,
              updateLoading: this.updateLoading,
              updateSentValue: this.updateSentValue,
              qrcodeData: qrcodeData,
              uuid: uuid,
              row: row,
              item: item,
            });
          }}>
          <Text>{item.title}</Text>
          <Right>
            {item.submited !== undefined && item.submited == 1 ? (
              <Icon
                name="check-circle"
                type="FontAwesome"
                style={styles.iconStyle}
                onPress={() => {
                  this.setState({loading: true});
                  navigate('SurveyItemScreen', {
                    updateRow: this.updateRow,
                    updateOptionsInPart: this.updateOptionsInPart,
                    PartOnSubmit: this.PartOnSubmit,
                    updateLoading: this.updateLoading,
                    updateSentValue: this.updateSentValue,
                    qrcodeData: qrcodeData,
                    uuid: uuid,
                    row: row,
                    item: item,
                  });
                }}
              />
            ) : (
              <Icon
                name="arrow-forward"
                style={{color: 'black', marginRight: '-25%'}}
                onPress={() => {
                  this.setState({loading: true});
                  navigate('SurveyItemScreen', {
                    updateRow: this.updateRow,
                    updateOptionsInPart: this.updateOptionsInPart,
                    PartOnSubmit: this.PartOnSubmit,
                    updateLoading: this.updateLoading,
                    updateSentValue: this.updateSentValue,
                    qrcodeData: qrcodeData,
                    uuid: uuid,
                    row: row,
                    item: item,
                  });
                }}
              />
            )}
          </Right>
        </CardItem>
      </Card>
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    const {
      uuid,
      row,
      qrcodeData,
      isConnected,
      isInternetReachable,
      loading,
    } = this.state;
    const data = this.state.data.parts;

    return (
      <Container style={styles.container}>
        <MyHeader
          title={'Survey'}
          backarrow={true}
          navigate={navigate}
          flag={0}
        />
        <Content>
          <List
            dataArray={data}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(item, index) =>
              this._renderRow(item, index, navigate, uuid, row, qrcodeData)
            }></List>
        </Content>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <SubmitFooter
          allDone={this.allDone}
          title={isConnected && isInternetReachable ? 'Done' : 'offline Done'}
          flag={1}
          color={isConnected && isInternetReachable ? '#3F51B5' : '#a9a9a9'}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  iconStyle: {
    color: 'green',
    marginRight: '-25%',
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccc',
  },
  title: {
    textAlign: 'left',
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  avatar: {
    width: '100%',
    height: 200,
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
  },
});
