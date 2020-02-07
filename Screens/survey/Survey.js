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
    };
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

  PartOnSubmit = pageId => {
    const {parts} = this.state.data;

    this.setState(
      {
        data: {
          ...this.state.data,
          parts: parts.map(elem => {
            if (elem.id === pageId) {
              return {
                ...elem,
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

  async UNSAFE_componentWillMount() {
    const data = this.props.navigation.getParam('data', () => false);
    const scanner = this.props.navigation.getParam('scanner', () => false);

    console.log('data ==> ', data);
    this.setState(
      {
        // here it was another code
        data: data,
        uuid: data.uuid,
        scanner: scanner,
      },
      () => {
        this.AddParamToOptions(data).then(res => {
          this.setState({
            // here it was another code
            data: {...data, parts: res},
            uuid: data.uuid,
            scanner: scanner,
          });
        });
      },
    );
    // here it was another code
  }

  //
  UNSAFE_componentWillUnmount() {
    //
    if (
      this.scanner !== undefined &&
      this.scanner !== null &&
      this.scanner !== false
    ) {
      this.scanner.reactivate();
      this.setState({data: '', scanner: undefined});
      // this.props.navigation.popToTop()
    }
  }

  // store data into local storage

  _storeData = async () => {
    const {data} = this.state;

    // try {
    //   let newdata = [];
    //   const value = await AsyncStorage.getItem('data');
    //   console.log('totototooto');
    //   if (value === null) {
    //     newdata = [data];
    //     newdata = JSON.stringify(newdata);
    //     console.log('first FINAL DATA ===> ', newdata);
    //     // don't forget this check if local storage is full
    //     await AsyncStorage.setItem('data', newdata);
    //   } else if (value !== null) {
    //     newdata = JSON.parse(value);
    //     newdata = [...newdata, data];
    //     console.log('second FINAL DATA ===> ', newdata);
    //     await AsyncStorage.removeItem('data');
    //     newdata = JSON.stringify(newdata);
    //     console.log('second FINAL DATA in push ===> ', newdata);
    //     await AsyncStorage.setItem('data', newdata);
    //   }
    // } catch (error) {
    //   alert(error);
    // }

    /*
      - scan qr code  
      - display pages
      - select page
      - fill fields 
      - submit
    */

    // var path = RNFS.DocumentDirectoryPath + '/Surveys.txt';

    // RNFS.readFile(path, 'utf8')
    //   .then(res => {
    //     RNFS.unlink(path)
    //       .then(() => {
    //         var string = JSON.stringify(data);
    //         console.log('newstring ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', string);
    //         RNFS.writeFile(path, string, 'utf8')
    //           .then(success => {
    //             alert('file created 2 after deleted');
    //           })
    //           .catch(err => {
    //             alert('file creation failed 2 after deleted');
    //             // console.log(err.message);
    //           });
    //       })
    //       .catch(err => {});
    //   })
    //   .catch(err => {
    //     alert('file not found 1');
    //     var string = JSON.stringify(data);
    //     console.log('uuuuuuuuuuuuu', string);
    //     RNFS.writeFile(path, string, 'utf8')
    //       .then(success => {
    //         alert('file created 1, and filled with first page');
    //       })
    //       .catch(err => {
    //         alert('err file not created 1');
    //         // console.log(err.message);
    //       });
    //   });

    // dont forget adding variables to survey

    // make a name for file

    var name = '/file_' + data.rowid + '.txt';
    var path = RNFS.DocumentDirectoryPath + name;

    RNFS.unlink(path)
      .then(() => {
        var string = JSON.stringify(data);
        RNFS.writeFile(path, string, 'utf8')
          .then(success => {
            alert('file created  after deleted');
          })
          .catch(err => {
            alert('file creation failed after deleted');
          });
      })
      .catch(err => {
        var string = JSON.stringify(data);
        RNFS.writeFile(path, string, 'utf8')
          .then(success => {
            alert('success creation 1 ');
          })
          .catch(err => {
            alert('failed creation 1');
          });
      });
  };

  updateRow = row => {
    if (row !== null && row !== undefined) {
      this.setState({
        row: row,
      });
    }
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
    const {uuid, row} = this.state;
    const data = this.state.data.parts;

    // console.log(
    //   'Data  ********************* => ',
    //   JSON.stringify(this.state.data),
    // );
    return (
      <Container style={styles.container}>
        <MyHeader title={'Survey'} backarrow={true} navigate={navigate} />
        {/* <Content> */}
        <List
          dataArray={data}
          keyExtractor={(item, index) => index.toString()}
          renderRow={(item, index) =>
            this._renderRow(item, index, navigate, uuid, row, data.qrcodeData)
          }></List>
        {/* </Content> */}
        <SubmitFooter _senddata={this._senddata} title={'All Done'} />
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

// {
//   "creationDate": "2020-01-26",
//   "description": "survey",
//   "name": "survey",
//   "privacy": 0,
//   "uuid": "30a33c1e-28ec-44f0-877e-a20c82909fa1",
//   "parts": [
//     {
//       "id": 42,
//       "title": "Page 1",
//       "variables":[
//         {"id":112,"name":"newQuestion","question":"newQuestion","type":4,"options":["hello","world"], valu:''},
//         {"id":114,"name":"textboooox","question":"textbox","type":0,"options":[]}
//       ]
//     },
//     {
//          "id": 53,
//           "title": "Page 2",
//          "variables": [Array]
//      }
//   ]
// }
