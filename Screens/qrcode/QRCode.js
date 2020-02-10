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
              // Check exp time
              this.setState({loading: true});
              const url = `https://impactree.um6p.ma/api/anon/dataset/${token.dataset}/parts`;
              // const url = `http://wtr.oulhafiane.me/api/anon/dataset/${token.dataset}/parts`;
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

  // create array of index to identifie each row
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

  _render = loading => {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={e => {
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
                // alert(err);
              });
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
