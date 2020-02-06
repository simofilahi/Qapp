import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Overlay } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import NetInfo from '@react-native-community/netinfo';

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

  onSuccess = (data) => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            try {
              var token = jwtDecode(data);
              // Check exp time
              this.setState({ loading: true });
              const url = `http://wtr.oulhafiane.me/api/anon/dataset/${token.dataset}/parts`;
              const config = {
                headers: { 'X-AUTH-TOKEN': data },
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
          } else Alert.alert('No Internet Connection');
        });
      }
    });
  };

  _render = (loading) => {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={e => {
            this.onSuccess(e.data)
              .then(res => {
                this.props.navigation.navigate('SurveyScreen', {
                  data: res.data,
                  qrcodeData: res.qrcodeData,
                  scanner: this.scanner,
                });
              })
              .catch(err => {
                alert(err);
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
        <View style={{ width: wp('80'), marginBottom: hp('0') }}>
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
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {this._render(loading)}
      </View>
    );
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
