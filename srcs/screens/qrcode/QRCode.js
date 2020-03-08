import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import NetInfo from '@react-native-community/netinfo';
import rooturl from '../../config';
var RNFS = require('react-native-fs');

export default class QRCodeScannerScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      reader: {
        message: null,
        data: null,
      },
      scanner: null,
      isVisible: true,
      loading: false,
    };
  }

  onSuccess = data => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            try {
              var token = jwtDecode(data);
              var timestamp = Date.now();
              if (timestamp < token.exp * 1000) {
                this.setState({loading: true});
                const url = `${rooturl}/api/anon/dataset/${token.dataset}/parts`;
                const config = {
                  headers: {'X-AUTH-TOKEN': data},
                };
                Axios.get(url, config)
                  .then(res => {
                    this.setState({
                      loading: false,
                    });
                    resolve({
                      data: res.data,
                      qrcodeData: data,
                      sent: true,
                    });
                  })
                  .catch(err => {
                    this.setState({
                      loading: false,
                    });
                    // console.log({error: err});
                    reject(err);
                  });
              } else {
                Alert.alert(
                  'Help',
                  'This is Qrcode is expired try with new Qrcode',
                  [
                    {
                      text: 'No',
                      onPress: () => null,
                    },
                    {
                      text: 'Ok',
                      onPress: () => null,
                    },
                  ],
                  {cancelable: false},
                );
                this.setState({
                  loading: false,
                });
              }
              // Check exp time
            } catch (err) {
              this.setState({
                loading: false,
              });
              reject(err);
            }
          } else Alert.alert('No Internet Connection');
        });
      }
    });
  };

  // create array of index to identifie each row;
  createRowIdfile = () => {
    return new Promise((resolve, reject) => {
      var path = null;
      var rowid = [];
      var string = '';

      string = JSON.stringify(rowid);
      path = RNFS.DocumentDirectoryPath + '/rowid.txt';
      RNFS.writeFile(path, string, 'utf8')
        .then(success => {
          // creation of file was succefully
          resolve('Created');
        })
        .catch(err => {
          reject('error During the creation');
          // check if there is a space available in disk
        });
    });
  };

  // create a template of survey;
  createTemplatefile = data => {
    return new Promise((resolve, reject) => {
      var path = null;
      var string = '';
      string = JSON.stringify(data);
      RNFS.getFSInfo().then(info => {
        const infospace = info.freeSpace / 1024 / 1024;

        if (infospace < 100) {
          Alert.alert(
            'Storage space',
            "You Don't have enough space please free up your storage and try again",
          );
        } else {
          path = RNFS.DocumentDirectoryPath + '/template.txt';
          RNFS.writeFile(path, string, 'utf8')
            .then(success => {
              resolve('Created');
            })
            .catch(err => {
              reject('error During the creation');
            });
        }
      });
    });
  };

  // this func work with date expiration of qrcode update the old template of survey by add new qrcode
  updateTemplatefile = newQrcode => {
    return new Promise(async (resolve, reject) => {
      var path = RNFS.DocumentDirectoryPath + '/template.txt';
      if (await RNFS.exists(path)) {
        RNFS.getFSInfo().then(info => {
          const infospace = info.freeSpace / 1024 / 1024;
          if (infospace < 100) {
            Alert.alert(
              'Storage space',
              "You Don't have enough space please free up your storage and try again",
            );
          } else {
            console.log({path: path});
            RNFS.readFile(path, 'utf8')
              .then(res => {
                data = JSON.parse(res);
                data.qrcodeData = newQrcode;
                var string = JSON.stringify(data);
                RNFS.writeFile(path, string, 'utf8')
                  .then(success => {
                    resolve('Created');
                  })
                  .catch(err => {
                    reject({err: 'error During the creation', flag: 1});
                  });
              })
              .catch(err => {
                reject({err: 'error During the creation', flag: 2});
              });
          }
        });
      } else {
        reject({err: 'file template not found', flag: 3});
      }
    });
  };

  // this func work with date expiration of qrcode the role of this is to read qrcode
  readQrcode = data => {
    const {uuidex} = this.props.navigation.state.params;
    var token = jwtDecode(data);
    var timestamp = Date.now();
    if (uuidex === token.dataset) {
      if (timestamp < token.exp * 1000) {
        this.updateTemplatefile(data)
          .then(res => {
            Alert.alert(
              'Success',
              'Your Qrcode was updated successfully',
              [
                {
                  text: 'No',
                  onPress: () => null,
                },
                {
                  text: 'Go tO SURVEY',
                  onPress: () =>
                    this.props.navigation.navigate('HomeScreen', {
                      TabId: 1,
                      flag: 1,
                    }),
                },
              ],
              {cancelable: false},
            );
          })
          .catch(err => {
            Alert.alert(
              'Failed',
              'Please try again \n Something went wrong during update Qrcode',
              [
                {
                  text: 'No',
                  onPress: () => null,
                },
                {
                  text: 'Ok',
                  onPress: () => null,
                },
              ],
              {cancelable: false},
            );
          });
      } else {
        Alert.alert(
          'Failed',
          'Your are trying to scan expired Qrcode',
          [
            {
              text: 'No',
              onPress: () => null,
            },
            {
              text: 'Ok',
              onPress: () => null,
            },
          ],
          {cancelable: false},
        );
        // alert expiration date;
      }
    } else {
      Alert.alert(
        'Failed',
        'Please scan the same qrcode of alerday survey that you had on mobile',
        [
          {
            text: 'No',
            onPress: () => null,
          },
          {
            text: 'Ok',
            onPress: () => null,
          },
        ],
        {cancelable: false},
      );
    }
  };

  _render = loading => {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={e => {
            const {uuidex} = this.props.navigation.state.params;
            if (uuidex !== null) {
              this.readQrcode(e.data);
            } else {
              this.onSuccess(e.data)
                .then(res => {
                  this.createTemplatefile(res)
                    .then(nothing => {
                      this.createRowIdfile()
                        .then(nothing => {
                          this.props.navigation.navigate('HomeScreen', {
                            TabId: 1,
                            flag: 0,
                          });
                        })
                        .catch();
                    })
                    .catch();
                })
                .catch(err => {
                  alert('Try again');
                });
            }
          }}
          fadeIn={true}
          showMarker={true}
          markerStyle={styles.marker}
          checkAndroid6Permissions={true}
          ref={elem => {
            this.scanner = elem;
          }}
          cameraStyle={styles.cameraContainer}
        />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{width: wp('80'), marginBottom: hp('0')}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Text style={styles.Text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {loading} = this.state;

    return <View style={styles.container}>{this._render(loading)}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
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
