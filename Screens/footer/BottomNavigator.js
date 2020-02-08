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
var RNFS = require('react-native-fs');

class MyFooter extends Component {
  state = {
    isVisible: false,
    open: false,
    loading: false,
  };

  _OnPress = (navigate, screen, flag) => {
    if (flag) {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            this.setState({
              isVisible: false,
              open: false,
            });
            navigate(screen);
          } else
            Alert.alert('Please check your internet connection and try again');
        });
      }
    } else {
      navigate(screen);
    }
  };

  onSuccess = data => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            try {
              var token = jwtDecode(data);
              // Check exp time
              this.setState({loading: true});
              const url = `http://wtr.oulhafiane.me/api/anon/dataset/${token.dataset}/parts`;
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
                  });
                })
                .catch(err => {
                  this.setState({
                    loading: false,
                  });
                  reject(err);
                });
            } catch {
              this.setState({
                loading: false,
              });
              reject('Try Again');
            }
          } else {
            Alert.alert('No Internet Connection');
          }
        });
      }
    });
  };

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

  createTemplatefile = data => {
    return new Promise((resolve, reject) => {
      var path = null;
      var string = '';
      string = JSON.stringify(data);

      path = RNFS.DocumentDirectoryPath + '/template.txt';
      RNFS.writeFile(path, string, 'utf8')
        .then(success => {
          resolve('Created');
        })
        .catch(err => {
          reject('error During the creation');
        });
    });
  };

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
                      alert(err);
                    });
                });
              }
            }
          });
        } else
          Alert.alert('Please check your internet connection and try again');
      });
    }
  };

  render() {
    const {navigate, TabId, addNewRow} = this.props;
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
                onPress={() =>
                  this.setState({
                    isVisible: !this.state.isVisible,
                    open: !this.state.open,
                  })
                }>
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
                  onPress={() => this._OnPress(navigate, 'QRCodeScreen', 1)}>
                  <Icon
                    name="camera"
                    onPress={() => this._OnPress(navigate, 'QRCodeScreen', 1)}
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
              onPress={() =>
                this.setState({
                  isVisible: !this.state.isVisible,
                  open: !this.state.open,
                })
              }>
              <Icon name="qrcode" style={{color: 'black'}} type="FontAwesome" />
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
                  onPress={() => this._OnPress(navigate, 'MapScreen', 1)}
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
                  onPress={() => this._OnPress(navigate, 'AboutUs', 0)}
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
                  onPress={() => this._OnPress(navigate, 'MapScreen', 1)}
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
                  onPress={() => this._OnPress(navigate, 'AboutUs', 0)}
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
