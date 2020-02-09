import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  List,
  Container,
  Card,
  CardItem,
  Text,
  Icon,
  Body,
  Right,
  Content,
} from 'native-base';
import MyHeader from '../header/Header';
import SubmitFooter from '../footer/SubmitFooter';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
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

  PartOnSubmit = (pageId, partAnswer) => {
    const {parts} = this.state.data;

    this.setState(
      {
        data: {
          ...this.state.data,
          parts: parts.map(elem => {
            if (elem.id === pageId) {
              return {
                ...elem,
                answers: partAnswer,
                submited: true,
              };
            } else return elem;
          }),
        },
      },
      () => this._storeData(),
    );
  };

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
              return {
                ...elem,
                options:
                  elem.options.length > 0
                    ? elem.options.map((elem, index) => {
                        return {
                          id: index,
                          value: elem,
                          checked: false,
                        };
                      })
                    : arr,
                // i put this variable to check if partie submited or not
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

  UNSAFE_componentWillMount() {
    const template = this.props.navigation.getParam('data', () => false);
    const scanner = this.props.navigation.getParam('scanner', () => false);
    const flag = this.props.navigation.getParam('flag', () => false);

    console.log('template ======> ', template);
    this.setState(
      {
        // here it was another code
        data: template.data,
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
        if (flag === 1) {
          this.AddParamToOptions(template.data).then(res => {
            this.setState({
              // here it was another code
              data: {...template.data, parts: res},
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

  // store data into local storage

  _storeData = async () => {
    const {rowid, data, qrcodeData} = this.state;
    var name = '/file_' + rowid + '.txt';
    var path = RNFS.DocumentDirectoryPath + name;

    RNFS.unlink(path)
      .then(() => {
        var string = JSON.stringify({data, rowid, qrcodeData});
        RNFS.writeFile(path, string, 'utf8')
          .then(success => {
            alert('file created  after deleted');
          })
          .catch(err => {
            alert('file creation failed after deleted');
          });
      })
      .catch(err => {
        var string = JSON.stringify({data, rowid, qrcodeData});
        RNFS.writeFile(path, string, 'utf8')
          .then(success => {
            alert('success creation 1 ');
          })
          .catch(err => {
            alert('failed creation 1');
          });
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

  // create answer variable for whole pages this work with offline submit
  createGlobaAnswerArray = async template => {
    const {row} = this.state;
    let promise = new Promise((resolve, reject) => {
      var answers = [];

      template.data.parts.map(elem => {
        if (Array.isArray(elem.answers)) {
          answers = elem.answers;
          if (elem.answers === answers) resolve(answers);
        }
      });
    });
    let res = await promise;
    data = {...template, answers: {row: row, variable: res}};
    return data;
  };

  // call this func when Done button pressed

  allDone = () => {
    const {rowid} = this.state;
    const {navigate} = this.props.navigation;
    var name = '/file_' + rowid + '.txt';
    var path = RNFS.DocumentDirectoryPath + name;

    // dont forget to check if file alerday exist and filled with old data
    RNFS.readFile(path, 'utf8')
      .then(res => {
        res = JSON.parse(res);
        this.createGlobaAnswerArray(res)
          .then(res => {
            let string = JSON.stringify(res);
            RNFS.writeFile(path, string, 'utf8')
              .then(success => {
                navigate('HomeScreen', {
                  TabId: 1,
                  flag: 1,
                });
              })
              .catch(err => {});
          })
          .catch(err => {});
      })
      .catch(err => {
        // alert('file creation failed after deleted');
      });
  };

  _renderRow = (item, index, navigate, uuid, row, qrcodeData) => {
    // alert(qrcodeData);
    // console.log('each item ===> ', item), console.log('\n');
    return (
      <Card
        key={index}
        style={{marginLeft: 15, marginRight: 15, marginTop: '1%'}}>
        <CardItem
          header
          bordered
          button
          onPress={() => {
            navigate('SurveyItemScreen', {
              updateRow: this.updateRow,
              updateOptionsInPart: this.updateOptionsInPart,
              PartOnSubmit: this.PartOnSubmit,
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
                onPress={() =>
                  navigate('SurveyItemScreen', {
                    updateRow: this.updateRow,
                    updateOptionsInPart: this.updateOptionsInPart,
                    PartOnSubmit: this.PartOnSubmit,
                    qrcodeData: qrcodeData,
                    uuid: uuid,
                    row: row,
                    item: item,
                  })
                }
              />
            ) : (
              <Icon
                name="arrow-forward"
                style={{color: 'black', marginRight: '-25%'}}
                onPress={() =>
                  navigate('SurveyItemScreen', {
                    updateRow: this.updateRow,
                    updateOptionsInPart: this.updateOptionsInPart,
                    PartOnSubmit: this.PartOnSubmit,
                    qrcodeData: qrcodeData,
                    uuid: uuid,
                    row: row,
                    item: item,
                  })
                }
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
        <SubmitFooter
          allDone={this.allDone}
          title={isConnected && isInternetReachable ? 'Done' : 'offline Done'}
          flag={1}
          color={isConnected && isInternetReachable ? '#3F51B5' : '#E5E6E8'}
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
