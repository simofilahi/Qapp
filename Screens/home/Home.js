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
import {StyleSheet, Dimensions, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
          rowidarray.map(elem => {
            let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
            // if (RNFS.exists(path)) {
            RNFS.readFile(path, 'utf8')
              .then(res => {
                res = JSON.parse(res);
                Surveys.push(res);
                if (rowidarray[elem + 1] == undefined) resolve(Surveys);
              })
              .catch(err => {
                if (rowidarray[elem + 1] == undefined) resolve(Surveys);
              });
            // } else reject('error');
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // console.log('before');
  // let res = await promise;
  // console.log('after');
  // return res;

  UNSAFE_componentWillReceiveProps(newProps) {
    const TabId = newProps.navigation.getParam('TabId', false);
    const flag = newProps.navigation.getParam('flag', false);

    if (flag === 1) {
      // this func called when i press on all done button
      console.log('Im here');
      this.setState({loading: true}, () => {
        console.log('holla');
        this.getDataFromLocalStorage()
          .then(data => {
            console.log('data yoyooyo => ', data);
            this.setState({
              Surveys: data,
              TabId: TabId,
              boolean: data.length === 0 ? false : true,
              loading: false,
            });
          })
          .catch(err => {
            console.log('catch');
            this.setState({
              loading: false,
            });
          });
      });
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
  }

  // delete all stucked survey
  deleteAllRows = async () => {
    let promise = new Promise((resolve, reject) => {
      let path = RNFS.DocumentDirectoryPath + '/rowid.txt';

      RNFS.readFile(path, 'utf8')
        .then(rowidarray => {
          rowidarray = JSON.parse(rowidarray);
          rowidarray.forEach(elem => {
            let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
            RNFS.unlink(path, 'utf8')
              .then(res => {})
              .catch(err => {});
            if (rowidarray[elem + 1] === undefined) resolve('finished');
          });
        })
        .catch(err => {});
    });

    let res = await promise;
    let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
    RNFS.unlink(path, 'utf8')
      .then(res => {})
      .catch(err => {});
    this.setState({
      Surveys: [],
    });
  };

  // give us your feedback func
  feedBack = () => {
    alert('feedback');
  };

  // delete on row
  deleteRow = rowid => {
    // alert('yes');
    let path = RNFS.DocumentDirectoryPath + '/file_' + rowid + '.txt';

    RNFS.unlink(path, 'utf8')
      .then(res => {
        this.setState({
          Surveys: this.state.Surveys.filter(elem => {
            if (elem.rowid !== rowid) return elem;
          }),
        });
      })
      .catch(err => {});
  };

  // send one row to backend
  sendRow = (surveyrow, rowid) => {
    console.log('row ==> ', JSON.stringify(surveyrow.data.parts[0].id));

    try {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            {
              const uuid = surveyrow.data.uuid;
              const qrcodeData = surveyrow.qrcodeData;
              const variables = surveyrow.answers.variable;
              const row = surveyrow.answers.row;
              // this line above is tmp
              const pageId = surveyrow.data.parts[0].id;

              this.setState({loading: true});
              const url = `https://impactree.um6p.ma/api/anon/dataset/${uuid}/part/${pageId}`;
              const data = {
                row: row,
                variables: variables,
              };
              const config = {
                headers: {'X-AUTH-TOKEN': qrcodeData},
              };
              console.log(JSON.stringify(data));
              console.log({pageId: pageId});
              console.log({url: url});
              console.log({qrcodeData: qrcodeData});
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
                  // alert(error);
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
  };

  // send all rows to backend
  sendAllRows = async () => {
    var promise = (surveyrow, rowid) => {
      return new Promise((resolve, reject) => {
        if (Platform.OS === 'android') {
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              {
                const uuid = surveyrow.data.uuid;
                const qrcodeData = surveyrow.qrcodeData;
                const variables = surveyrow.answers.variable;
                const row = surveyrow.answers.row;
                // this line above is tmp
                const pageId = surveyrow.data.parts[0].id;
                this.setState({loading: true});
                const url = `https://impactree.um6p.ma/api/anon/dataset/${uuid}/part/${pageId}`;
                const data = {
                  row: row,
                  variables: variables,
                };
                const config = {
                  headers: {'X-AUTH-TOKEN': qrcodeData},
                };
                console.log(JSON.stringify(data));
                console.log({pageId: pageId});
                console.log({url: url});
                console.log({qrcodeData: qrcodeData});
                Axios.post(url, data, config)
                  .then(res => {
                    this.setState({
                      loading: false,
                    });
                    this.deleteRow(rowid);
                    resolve('succes');
                  })
                  .catch(error => {
                    this.setState({
                      loading: false,
                    });
                    // alert(error);
                    reject('failed');
                  });
              }
            } else Alert.alert('Please check your Internet connection');
          });
        }
      });
    };

    let loop = () => {
      return new Promise((resolve, reject) => {
        const {Surveys} = this.state;

        Surveys.map(async (elem, index) => {
          await promise(elem, elem.rowid)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
          if (elem[index + 1] === undefined) resolve('loop finished');
        });
      });
    };
    console.log('after');
    await loop();
    console.log('finished');
  };

  // add new survey
  addNewRow = () => {
    const {navigate} = this.props.navigation;
    let path = RNFS.DocumentDirectoryPath + '/rowid.txt';

    RNFS.readFile(path, 'utf8')
      .then(rowidarray => {
        rowidarray = JSON.parse(rowidarray);
        if (rowidarray.length === 0) {
          var rowid = 0;
          rowidarray[0] = 0;
        } else {
          var rowid = rowidarray[rowidarray.length - 1] + 1;
          rowidarray[rowidarray.length] = rowidarray[rowidarray.length - 1] + 1;
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
  };

  render() {
    const {navigate} = this.props.navigation;
    const {boolean, Surveys, TabId, loading} = this.state;
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
            />
          </Tab>
        </Tabs>
        <MyFooter
          navigate={navigate}
          TabId={TabId}
          addNewRow={this.addNewRow}
          OfflineSurveyBoolean={OfflineSurveyBoolean}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
    backfaceVisibility: 'hidden',
  },
  marker: {
    borderColor: 'white',
  },
  button: {
    alignItems: 'center',
    padding: hp('10'),
    marginTop: hp('10'),
    alignContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 20,
  },
});
