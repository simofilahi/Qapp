import React, {Component} from 'react';
import MyHeader from '../header/Header';
import MyFooter from '../footer/Myfooter';
import HomeBody from './HomeBody';
import ListOfSurvey from './ListOfSurvey';
import {Container, Tab, Tabs} from 'native-base';
import Axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import rooturl from '../../config';
import jwtDecode from 'jwt-decode';
var RNFS = require('react-native-fs');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientationtype: null,
      boolean: false,
      Surveys: [],
      TabId: 1,
      template: [],
      loading: false,
      //
      isInternetReachable: false,
      isConnected: false,
      flagForNoti: false,
      loading: false,
      // visible var work with expiration date of Qr code to pop-up the overlay
      visible: false,
      // uuid and date expiration those var work with expired Qr code.
      uuidex: null,
    };
  }

  static navigationOptions = {
    header: null,
  };

  // read data from local storage
  getDataFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
      let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
      var Surveys = [];
      RNFS.readFile(path, 'utf8')
        .then(rowidarray => {
          rowidarray = JSON.parse(rowidarray);
          if (rowidarray.length > 0) {
            rowidarray.map(elem => {
              let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
              RNFS.readFile(path, 'utf8')
                .then(res => {
                  res = JSON.parse(res);
                  Surveys.push(res);
                  if (rowidarray[elem + 1] == undefined) resolve(Surveys);
                })
                .catch(err => {
                  if (rowidarray[elem + 1] == undefined) resolve(Surveys);
                });
            });
          } else {
            resolve(Surveys);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // this func receive props from other screen;
  UNSAFE_componentWillReceiveProps(newProps) {
    const TabId = newProps.navigation.getParam('TabId', false);
    const flag = newProps.navigation.getParam('flag', false);

    if (flag === 1) {
      // this func called when i press on all done button
      this.setState(
        {
          loading: true,
        },
        () => {
          this.getDataFromLocalStorage()
            .then(data => {
              this.setState({
                Surveys: data,
                TabId: TabId,
                boolean: data.length === 0 ? false : true,
                loading: false,
                // those two line above for date expiration
                visible: false,
                uuidex: null,
              });
            })
            .catch(err => {
              this.setState({
                loading: false,
              });
            });
        },
      );
    } else if (flag === 0) {
      this.setState({
        Surveys: [],
        boolean: false,
        TabId: TabId,
      });
    }
  }

  UNSAFE_componentWillMount() {
    const data = this.props.navigation.getParam('data', false);
    const TabId = this.props.navigation.getParam('TabId', false);

    // this called when i get data from splashScreen
    if (data !== false && TabId !== false) {
      this.setState({
        Surveys: data,
        TabId: TabId,
        boolean: data.length === 0 ? false : true,
      });
    }
  }

  //Request for the permissions
  requestPermission = () => {
    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]).then(result => {
        if (
          result['android.permission.ACCESS_COARSE_LOCATION'] &&
          result['android.permission.CAMERA'] &&
          result['android.permission.ACCESS_FINE_LOCATION'] &&
          result['android.permission.READ_EXTERNAL_STORAGE'] &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
        } else {
          RNExitApp.exitApp();
        }
      });
    } catch (err) {
      // console.warn(err);
    }
  };

  // Request for the permissions
  componentDidMount() {
    this.requestPermission();
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState(
        {
          flag:
            this.state.isConnected === true &&
            this.state.isInternetReachable === true
              ? false
              : true,
          isConnected: state.isConnected,
          isInternetReachable: state.isInternetReachable,
        },
        () => {
          const {isInternetReachable, isConnected, Surveys, flag} = this.state;

          if (
            isConnected === true &&
            isInternetReachable === true &&
            Surveys.length > 0 &&
            flag === true
          ) {
            PushNotification.localNotification({
              autoCancel: true,
              largeIcon: 'ic_launcher',
              smallIcon: 'ic_notification',
              bigText: "Please Submit your survey those doesn't sent yet",
              subText: 'This is a subText',
              color: '#3F51B5',
              vibrate: true,
              vibration: 300,
              title: 'Offline surveys',
              message: 'Your are now connected to the internet',
              playSound: true,
              soundName: 'default',
            });
          }
        },
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // delete all survey
  DeleteAllRowPromise = () => {
    return new Promise(async (resolve, reject) => {
      let path = RNFS.DocumentDirectoryPath + '/rowid.txt';

      if (await RNFS.exists(path)) {
        RNFS.readFile(path, 'utf8')
          .then(rowidarray => {
            rowidarray = JSON.parse(rowidarray);
            rowidarray.forEach(async elem => {
              let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
              if (await RNFS.exists(path)) {
                RNFS.unlink(path, 'utf8');
                if (rowidarray[elem + 1] === undefined) resolve('succes');
              } else {
                if (rowidarray[elem + 1] === undefined) reject('failed');
              }
            });
          })
          .catch(err => {});
      } else {
        reject('failed');
      }
    });
  };

  // delete all stucked survey
  deleteAllRows = () => {
    this.DeleteAllRowPromise()
      .then(res => {
        this.setState({
          Surveys: [],
          boolean: false,
        });
      })
      .catch(err => {});
  };

  // give us your feedback func
  feedBack = () => {
    alert('feedback');
  };

  // delete one row
  deleteRow = rowid => {
    let path = RNFS.DocumentDirectoryPath + '/file_' + rowid + '.txt';

    RNFS.unlink(path, 'utf8')
      .then(res => {
        this.setState(
          {
            Surveys: this.state.Surveys.filter(elem => {
              if (elem.rowid !== rowid) return elem;
            }),
          },
          () => {
            this.setState({
              boolean: this.state.Surveys.length === 0 ? false : true,
            });
          },
        );
      })
      .catch(err => {});
  };

  updateUuidexAndVisible = () => {
    this.setState({
      uuidex: null,
      visible: false,
    });
  };

  // this func read the files in local storage in change qrcode;
  CopyQrcodefromTemplateToSurvey = newQrcode => {
    return new Promise((resolve, reject) => {
      try {
        let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
        var Surveys = [];
        RNFS.readFile(path, 'utf8')
          .then(rowidarray => {
            rowidarray = JSON.parse(rowidarray);
            if (rowidarray.length > 0) {
              rowidarray.map(elem => {
                let path =
                  RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
                RNFS.readFile(path, 'utf8')
                  .then(res => {
                    let path =
                      RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
                    res = JSON.parse(res);
                    res.qrcodeData = newQrcode;
                    var string = JSON.stringify(res);
                    RNFS.writeFile(path, string, 'utf8')
                      .then(res => {})
                      .catch(err => {
                        reject({
                          err: 'something wrong happen during write in file',
                        });
                      });
                  })
                  .catch(err => {
                    reject({err: 'something wrong happen during read of file'});
                  });
              });
              resolve({res: 'success'});
            } else {
              reject({res: 'array is empty'});
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject({err: err});
      }
    });
  };

  // send one row to backend
  sendRow = (surveyrow, rowid) => {
    this.DateExpirationQrCode().then(ret => {
      if (ret.flag === 1) {
        if (surveyrow.answers !== undefined) {
          try {
            if (Platform.OS === 'android') {
              NetInfo.fetch().then(state => {
                if (state.isConnected) {
                  {
                    this.setState({loading: true});
                    const uuid = surveyrow.data.uuid;
                    const qrcodeData = surveyrow.qrcodeData;
                    let data = [
                      {
                        row: surveyrow.answers.row,
                        data_row: surveyrow.answers.allpartanswers,
                      },
                    ];
                    data = {data: data};
                    const url = `${rooturl}/api/anon/dataset/${uuid}/`;
                    const config = {
                      headers: {'X-AUTH-TOKEN': qrcodeData},
                    };
                    console.log(JSON.stringify(data));
                    console.log({qrcodeData: qrcodeData});
                    console.log({uuid: uuid});
                    console.log({url: url});
                    Axios.post(url, data, config)
                      .then(res => {
                        this.setState({
                          loading: false,
                        });
                        this.deleteRow(rowid);
                      })
                      .catch(error => {
                        this.setState({
                          loading: false,
                        });
                        alert('Please Try again');
                      });
                  }
                } else Alert.alert('Please check your Internet connection');
              });
            }
          } catch {
            this.setState({
              loading: false,
            });
            alert('Try Again');
          }
          this.setState({
            boolean: this.state.Surveys.length === 0 ? false : true,
          });
        }
      } else if (ret.flag === 0) {
        Alert.alert(
          'Help',
          'Your Qrcode is expired please scan the same Qrcode with new expiration date ask your supervised to send you new Qrcode',
          [
            {
              text: 'No',
              onPress: () => null,
            },
            {
              text: 'Scan new',
              //
              onPress: () =>
                this.setState({
                  TabId: 0,
                  visible: true,
                }),
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  // send all rows to backend
  sendAllRows = () => {
    this.DateExpirationQrCode().then(ret => {
      if (ret.flag === 1) {
        const {Surveys} = this.state;
        if (Surveys !== undefined) {
          try {
            if (Platform.OS === 'android') {
              NetInfo.fetch().then(state => {
                if (state.isConnected) {
                  {
                    this.setState({loading: true});
                    const uuid = Surveys[0].data.uuid;
                    const qrcodeData = Surveys[0].qrcodeData;
                    let data = [];
                    Surveys.map((elem, index) => {
                      if (elem.answers !== undefined) {
                        if (data.length === 0) {
                          data = [
                            {
                              row: elem.answers.row,
                              data_row: elem.answers.allpartanswers,
                            },
                          ];
                        } else if (data.length > 0) {
                          data = [
                            ...data,
                            {
                              row: elem.answers.row,
                              data_row: elem.answers.allpartanswers,
                            },
                          ];
                        }
                      }
                    });
                    data = {data: data};
                    const url = `${rooturl}/api/anon/dataset/${uuid}/`;
                    const config = {
                      headers: {'X-AUTH-TOKEN': qrcodeData},
                    };
                    console.log(JSON.stringify(data));
                    console.log({qrcodeData: qrcodeData});
                    console.log({uuid: uuid});
                    console.log({url: url});
                    Axios.post(url, data, config)
                      .then(res => {
                        this.setState({
                          loading: false,
                        });
                        Surveys.map((elem, index) => {
                          this.deleteRow(elem.rowid);
                        });
                      })
                      .catch(error => {
                        this.setState({
                          loading: false,
                        });
                        alert(error);
                      });
                  }
                } else Alert.alert('Please check your Internet connection');
              });
            }
          } catch {
            this.setState({
              loading: false,
            });
            alert('Try Again');
          }
          this.setState({
            boolean: this.state.Surveys.length === 0 ? false : true,
          });
        }
      } else if (ret.flag === 0) {
        Alert.alert(
          'Help',
          'Your Qrcode is expired please scan the same Qrcode with new expiration date ask your supervised to send you new Qrcode',
          [
            {
              text: 'No',
              onPress: () => null,
            },
            {
              text: 'Scan new',
              //
              onPress: () =>
                this.setState({
                  TabId: 0,
                  visible: true,
                }),
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  // add new survey
  addNewRow = () => {
    const {navigate} = this.props.navigation;
    let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
    RNFS.getFSInfo().then(info => {
      const infospace = info.freeSpace / 1024 / 1024;
      if (infospace < 100) {
        Alert.alert(
          'Storage space',
          "You Don't have enough space please free up your storage and try again",
        );
      } else {
        RNFS.readFile(path, 'utf8')
          .then(rowidarray => {
            rowidarray = JSON.parse(rowidarray);
            if (rowidarray.length === 0) {
              var rowid = 0;
              rowidarray[0] = 0;
            } else {
              var rowid = rowidarray[rowidarray.length - 1] + 1;
              rowidarray[rowidarray.length] =
                rowidarray[rowidarray.length - 1] + 1;
            }
            let string = JSON.stringify(rowidarray);
            RNFS.unlink(path, 'utf8')
              .then(res => {
                RNFS.writeFile(path, string, 'utf8')
                  .then(res => {
                    let path = RNFS.DocumentDirectoryPath + '/template.txt';
                    RNFS.readFile(path, 'utf8')
                      .then(template => {
                        template = JSON.parse(template);
                        navigate('SurveyScreen', {
                          data: {...template, rowid: rowid},
                          flag: 1,
                        });
                      })
                      .catch(err => {});
                  })
                  .catch(err => {});
              })
              .catch(err => {
                RNFS.writeFile(path, string, 'utf8')
                  .then(res => {})
                  .catch(err => {});
              });
          })
          .catch(err => {});
      }
    });
  };

  // check date expiration of qrcode
  DateExpirationQrCode = () => {
    return new Promise(async (resolve, reject) => {
      let path = RNFS.DocumentDirectoryPath + '/template.txt';

      if (await RNFS.exists(path)) {
        RNFS.readFile(path, 'utf8')
          .then(template => {
            template = JSON.parse(template);
            var token = jwtDecode(template.qrcodeData);
            this.setState({
              uuidex: token.dataset,
            });
            var timestamp = Date.now();
            if (timestamp < token.exp * 1000) {
              resolve({flag: 1});
            } else {
              resolve({flag: 0});
            }
          })
          .catch(err => {
            resolve({flag: 0});
          });
      } else {
        // template not found
        resolve({flag: 2});
      }
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    const {boolean, Surveys, TabId, loading, visible, uuidex} = this.state;

    var OfflineSurveyBoolean = false;
    if (Surveys.length > 0) OfflineSurveyBoolean = true;
    return (
      <Container>
        <MyHeader
          title={'Home'}
          backarrow={false}
          flag={1}
          TabId={TabId}
          deleteAllRows={this.deleteAllRows}
          feedBack={this.feedBack}
        />
        <Tabs
          locked={true}
          initialPage={TabId}
          page={TabId}
          tabBarPosition="overlayTop"
          scrollWithoutAnimation={true}
          onChangeTab={e => this.setState({TabId: e.i})}>
          <Tab heading="Guide">
            <HomeBody navigate={navigate} />
          </Tab>
          <Tab heading="Survey">
            <ListOfSurvey
              boolean={boolean}
              Surveys={Surveys}
              sendOneSurvey={this.sendOneSurvey}
              sendRow={this.sendRow}
              sendAllRows={this.sendAllRows}
              deleteRow={this.deleteRow}
              loading={loading}
              navigate={navigate}
              // DateExpirationQrCode={this.DateExpirationQrCode}
            />
          </Tab>
        </Tabs>
        <MyFooter
          navigate={navigate}
          TabId={TabId}
          addNewRow={this.addNewRow}
          OfflineSurveyBoolean={OfflineSurveyBoolean}
          // this visible var work with expiration date of qr code
          visible={visible}
          // this two variable work with expiration date of qr code
          uuidex={uuidex}
          CopyQrcodefromTemplateToSurvey={this.CopyQrcodefromTemplateToSurvey}
          updateUuidexAndVisible={this.updateUuidexAndVisible}
        />
      </Container>
    );
  }
}
