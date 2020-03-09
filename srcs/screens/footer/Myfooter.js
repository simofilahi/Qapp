import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {Fab, Icon} from 'native-base';
import {Overlay, Text, Button} from 'react-native-elements';
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
import rooturl from '../../config';
var RNFS = require('react-native-fs');

class MyFooter extends Component {
  state = {
    isVisible: false,
    open: false,
    loading: false,
  };

  // redicret to screen requested
  _OnPress = (navigate, screen, flag, uuidex) => {
    if (flag) {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            this.setState({
              isVisible: false,
              open: false,
            });
            if (screen === 'QRCodeScreen') {
              const {CopyQrcodefromTemplateToSurvey} = this.props;
              navigate(screen, {
                uuidex: uuidex,
                CopyQrcodefromTemplateToSurvey: CopyQrcodefromTemplateToSurvey,
              });
            } else {
              navigate(screen);
            }
          } else
            Alert.alert('Please check your internet connection and try again');
        });
      }
    } else {
      navigate(screen);
    }
  };

  // read qrcode
  onSuccess = data => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            try {
              var token = jwtDecode(data);
              var timestamp = Date.now();
              // Check exp time
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
            } catch {
              this.setState({
                loading: false,
              });
              reject('Try Again');
            }
          } else Alert.alert('No Internet Connection');
        });
      }
    });
  };

  // create rowid file
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

  // create copy file of survey design
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

  // this func called when read qrcode by image
  openPhoto = navigate => {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          ImagePicker.launchImageLibrary({}, response => {
            if (response.didCancel) {
              this.setState({isVisible: false, open: false});
              // Alert.alert('User cancelled image picker');
            } else if (response.error) {
              this.setState({isVisible: false, open: false});
              // Alert.alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              this.setState({isVisible: false, open: false});
              // Alert.alert('User tapped custom button: ', response.customButton);
            } else {
              if (response.uri) {
                var path = response.path;
                if (!path) {
                  path = response.uri;
                }
                QRreader(path).then(data => {
                  this.setState({isVisible: false, open: false, loading: true});
                  const {uuidex} = this.props;
                  if (uuidex !== null) {
                    this.readQrcode(data);
                  } else {
                    this.onSuccess(data)
                      .then(res => {
                        this.createTemplatefile(res)
                          .then(nothing => {
                            this.createRowIdfile()
                              .then(nothing => {
                                navigate('HomeScreen', {
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
                });
              }
            }
          });
        } else
          Alert.alert('Please check your internet connection and try again');
      });
    }
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
            RNFS.readFile(path, 'utf8')
              .then(res => {
                data = JSON.parse(res);
                data.qrcodeData = newQrcode;
                var string = JSON.stringify(data);
                RNFS.writeFile(path, string, 'utf8')
                  .then(success => {
                    resolve(newQrcode);
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
    try {
      const {uuidex} = this.props;
      var token = jwtDecode(data);
      var timestamp = Date.now();
      if (uuidex === token.dataset) {
        if (timestamp < token.exp * 1000) {
          this.setState({
            loading: true,
          });
          this.updateTemplatefile(data)
            .then(res => {
              const newQrcode = res;
              this.props
                .CopyQrcodefromTemplateToSurvey(newQrcode)
                .then(res => {
                  this.setState({
                    loading: false,
                  });
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
                        onPress: () => {
                          this.props.navigate('HomeScreen', {
                            TabId: 1,
                            flag: 1,
                          });
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                })
                .catch(err => {
                  this.setState({
                    loading: false,
                  });
                });
            })
            .catch(err => {
              this.setState({
                loading: false,
              });
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
    } catch (err) {
      this.setState({loading: false});
      alert('Please try again');
    }
  };

  // this lifecycle help to assign true to overlay and button pop-up
  // and this one work with expiration date of qr code
  UNSAFE_componentWillReceiveProps() {
    const {visible} = this.props;
    if (visible) {
      this.setState({
        open: !this.state.open,
        isVisible: !this.state.isVisible,
      });
    }
  }

  render() {
    const {
      navigate,
      TabId,
      addNewRow,
      OfflineSurveyBoolean,
      uuidex,
      updateUuidexAndVisible,
    } = this.props;
    const {loading} = this.state;

    if (TabId === 0) {
      return (
        <View>
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{color: 'white'}}
          />
          <Overlay
            overlayStyle={{
              left: 0,
              top: 0,
              opacity: 0.8,
              backgroundColor: 'black',
            }}
            isVisible={this.state.isVisible}
            fullScreen={true}>
            <View
              style={{
                padding: 5,
                alignSelf: 'center',
                width: 70,
                height: 70,
                borderRadius: 35,
                bottom: 10,
                zIndex: 5,
                flex: 1,
              }}>
              <Fab
                containerStyle={{
                  alignSelf: 'center',
                  left: 7,
                  bottom: -4,
                }}
                active={this.state.open}
                direction="up"
                style={{
                  backgroundColor: 'white',
                  width: 65,
                  height: 65,
                  borderRadius: 35,
                }}
                onPress={() => {
                  // this work with expiration date of qr code
                  updateUuidexAndVisible();
                  //
                  this.setState({
                    isVisible: !this.state.isVisible,
                    open: !this.state.open,
                  });
                }}>
                <Icon name="remove" style={{color: 'black'}} />
                <Button
                  style={{
                    backgroundColor: '#E0E0E0',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    marginLeft: -6,
                    marginBottom: 20,
                  }}
                  onPress={() =>
                    this._OnPress(navigate, 'QRCodeScreen', 1, uuidex)
                  }>
                  <Icon
                    name="camera"
                    onPress={() =>
                      this._OnPress(navigate, 'QRCodeScreen', 1, uuidex)
                    }
                  />
                </Button>
                <Button
                  style={{
                    backgroundColor: '#E0E0E0',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    marginLeft: -6,
                    marginBottom: 30,
                  }}
                  onPress={() => this.openPhoto(navigate)}>
                  <Icon
                    name="photos"
                    onPress={() => this.openPhoto(navigate)}
                  />
                </Button>
              </Fab>
            </View>
          </Overlay>
          <View
            style={{
              position: 'absolute',
              padding: 5,
              alignSelf: 'center',
              backgroundColor: 'white',
              width: 70,
              height: 70,
              borderRadius: 35,
              bottom: 10,
              zIndex: 5,
            }}>
            <Fab
              containerStyle={{
                alignSelf: 'center',
                left: 7,
                bottom: 2,
              }}
              active={false}
              direction="up"
              style={{
                backgroundColor: 'white',
                width: 65,
                height: 65,
                borderRadius: 35,
              }}
              onPress={() => {
                if (OfflineSurveyBoolean === false) {
                  // this work with expiration date of qr code
                  updateUuidexAndVisible();
                  //
                  this.setState({
                    isVisible: !this.state.isVisible,
                    open: !this.state.open,
                  });
                } else {
                  Alert.alert(
                    'Help',
                    'Submit the alerday survey and try to scan new Qr code',
                    [
                      {
                        text: 'No',
                        onPress: () => null,
                      },
                      {
                        text: 'Go to survey',
                        // NOTE FOR FLAG = 1
                        onPress: () =>
                          navigate('HomeScreen', {
                            TabId: 1,
                            flag: 1,
                          }),
                      },
                    ],
                    {cancelable: false},
                  );
                }
              }}>
              <Icon
                name="qrcode"
                style={{color: 'black'}}
                type="FontAwesome"
                onPress={() => {
                  if (OfflineSurveyBoolean === false) {
                    this.setState({
                      isVisible: !this.state.isVisible,
                      open: !this.state.open,
                    });
                  } else {
                    Alert.alert(
                      'Help',
                      'Submit the alerday survey and try to scan new Qr code',
                      [
                        {
                          text: 'No',
                          onPress: () => null,
                        },
                        {
                          text: 'Go to survey',
                          // NOTE FOR FLAG = 1
                          onPress: () =>
                            navigate('HomeScreen', {
                              TabId: 1,
                              flag: 1,
                            }),
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                }}
              />
            </Fab>
          </View>
          <View
            style={{
              position: 'relative',
              backgroundColor: '#3F51B5',
              bottom: 0,
              zIndex: 1,
              width: '100%',
              height: 60,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <View
              style={{
                position: 'relative',
                alignContent: 'center',
                flexDirection: 'column',
                width: '50%',
              }}>
              <View
                style={{
                  height: '60%',
                  marginRight: '40%',
                  marginLeft: '10%',
                }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#3F51B5',
                    alignSelf: 'center',
                    height: '100%',
                  }}
                  onPress={() =>
                    this._OnPress(navigate, 'MapScreen', 1, uuidex)
                  }
                  icon={
                    <Icon
                      name="map"
                      type="FontAwesome5"
                      style={{color: 'white'}}
                    />
                  }
                />
              </View>
              <View
                style={{
                  height: '40%',
                  marginRight: '40%',
                  marginLeft: '10%',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  Maps
                </Text>
              </View>
            </View>
            <View
              style={{
                position: 'relative',
                alignContent: 'center',
                flexDirection: 'column',
                width: '50%',
              }}>
              <View
                style={{
                  height: '60%',
                  marginLeft: '40%',
                  marginRight: '10%',
                }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#3F51B5',
                    alignSelf: 'center',
                    height: '100%',
                  }}
                  onPress={() => this._OnPress(navigate, 'AboutUs', 0, uuidex)}
                  icon={
                    <Icon
                      name="users"
                      type="FontAwesome"
                      style={{color: 'white'}}
                    />
                  }
                />
              </View>
              <View
                style={{
                  height: '40%',
                  marginLeft: '40%',
                  marginRight: '10%',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  About Us
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    if (TabId === 1) {
      return (
        <View>
          <View
            style={{
              padding: 5,
              alignSelf: 'center',
              width: 70,
              height: 70,
              borderRadius: 35,
              bottom: 10,
              zIndex: 5,
              flex: 1,
            }}></View>
          <View
            style={{
              position: 'absolute',
              padding: 5,
              alignSelf: 'center',
              backgroundColor: 'white',
              width: 70,
              height: 70,
              borderRadius: 35,
              bottom: 10,
              zIndex: 5,
            }}>
            <Fab
              containerStyle={{
                alignSelf: 'center',
                left: 7,
                bottom: 2,
              }}
              active={false}
              direction="up"
              style={{
                backgroundColor: 'white',
                width: 65,
                height: 65,
                borderRadius: 35,
              }}
              onPress={() => {
                addNewRow();
              }}>
              <Icon name="add" style={{color: 'black'}} />
            </Fab>
          </View>
          <View
            style={{
              position: 'relative',
              backgroundColor: '#3F51B5',
              bottom: 0,
              zIndex: 1,
              width: '100%',
              height: 60,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <View
              style={{
                position: 'relative',
                alignContent: 'center',
                flexDirection: 'column',
                width: '50%',
              }}>
              <View
                style={{
                  height: '60%',
                  marginRight: '40%',
                  marginLeft: '10%',
                }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#3F51B5',
                    width: '50%',
                    alignSelf: 'center',
                    height: '100%',
                  }}
                  onPress={() =>
                    this._OnPress(navigate, 'MapScreen', 1, uuidex)
                  }
                  icon={
                    <Icon
                      name="map"
                      type="FontAwesome5"
                      style={{color: 'white'}}
                    />
                  }
                />
              </View>
              <View
                style={{
                  height: '40%',
                  marginRight: '40%',
                  marginLeft: '10%',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  Maps
                </Text>
              </View>
            </View>
            <View
              style={{
                position: 'relative',
                alignContent: 'center',
                flexDirection: 'column',
                width: '50%',
              }}>
              <View
                style={{
                  height: '60%',
                  marginLeft: '40%',
                  marginRight: '10%',
                }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#3F51B5',
                    alignSelf: 'center',
                    height: '100%',
                  }}
                  onPress={() => this._OnPress(navigate, 'AboutUs', 0, uuidex)}
                  icon={
                    <Icon
                      name="users"
                      type="FontAwesome"
                      style={{color: 'white'}}
                    />
                  }
                />
              </View>
              <View
                style={{
                  height: '40%',
                  marginLeft: '40%',
                  marginRight: '10%',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  About Us
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

export default MyFooter;
