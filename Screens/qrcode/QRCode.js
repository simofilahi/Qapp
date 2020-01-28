import React, { Component } from "react";
import { StyleSheet, Dimensions, View,TouchableOpacity, Text, Alert } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-navigation";
import { Button } from "native-base";
import Axios from "axios";
import jwtDecode from 'jwt-decode';
import NetInfo from '@react-native-community/netinfo'
import Spinner from 'react-native-loading-spinner-overlay';

export default class QRCodeScannerScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props)
    this.state = {
      reader: {
        message: null,
        data: null
      },
      scanner: null,
      isVisible: true,
      loading: false
    }
  }

  openPhoto = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        // Alert.alert('User cancelled image picker');
      }
      else if (response.error) {
        // Alert.alert('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // Alert.alert('User tapped custom button: ', response.customButton);
      }
      else {
        if(response.uri){
          var path = response.path;
          if(!path){
              path = response.uri;
          }
          QRreader(path).then((data)=>{
            this.onSuccess(data)
            .then((res) => {
              //
              this.props.navigation.goBack()
              this.props.navigation.navigate("SurveyScreen", {
                data: res.data,
                qrcodeData: res.qrcodeData,
              });
            }
            )
            .catch((err) => {
              alert(err)
            })
          });
      }
      }
    });
  }

  onSuccess = (data) => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === "android") {
        NetInfo.fetch().then(state => {
          if (state.isConnected){
            try {
              var token = jwtDecode(data)
            
              // Check exp time
              this.setState({loading : true})
              const url = `http://wtr.oulhafiane.me/api/anon/dataset/${token.dataset}/parts`
              const config = {
                headers: { "X-AUTH-TOKEN": data }
              };
              Axios.get(
                url,
                config
              )
              .then(res => {
                this.setState({
                  loading: false
                })
                resolve({
                  data: res.data,
                  qrcodeData: data
                })
              })
              .catch(err => {
                this.setState({
                  loading: false
                })
                reject("Something wrong try again")
              })
            } catch {
              this.setState({
                loading: false
              })
              reject("Try Again")
            }
          } else Alert.alert("No Internet Connection")
      })}
  
    })
  }

  _render = (loading, isVisible) => {
    if (!isVisible){
      return (
        <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => {
            this.onSuccess(e.data)
            .then((res) => {
              this.props.navigation.navigate("SurveyScreen", {
                data: res.data,
                qrcodeData: res.qrcodeData,
                scanner: this.scanner
              }); 
            }
            )
            .catch((err) => {
              alert((err))
            })
          }}
          fadeIn={true}
          showMarker={true}
          markerStyle={styles.marker}
          checkAndroid6Permissions={true}
          ref={elem => {
            this.scanner = elem;
          }}
          cameraStyle= {styles.cameraContainer}
        />
        <Spinner
             visible={loading}
             textContent={'Loading...'}
             textStyle={styles.spinnerTextStyle}
        />
        <View style={{width: wp('80'), marginBottom: hp('0')}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate("HomeScreen")}
              >
              <Text style={styles.Text}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </View>
      )
    }
    else if (isVisible){
      return (
        <View style={styles.container}>
          <Overlay
              isVisible={isVisible}
              onBackdropPress={() => this.setState({ isVisible: false })}
              fullScreen={true}
          >
          <SafeAreaView style={styles.container}>
            <Button 
              style={styles.button}
              onPress={this.openPhoto}
              >
              <Text>
                Upload Qr Code From Gallery
              </Text>
            </Button>
            <Button 
              style={styles.button}
              onPress={() => this.setState({ isVisible: false })}
              >
              <Text>
                Scan Qr Code By Camera
              </Text>
            </Button>
          </SafeAreaView>
        </Overlay>
        </View>
      )
    }
  }

  render() {
    const {loading, isVisible} = this.state

    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true} /> */}
        {this._render(loading, isVisible)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
    backfaceVisibility: 'hidden'
  },
  marker: {
      borderColor:'white',
  },
  button: {
    alignItems: 'center',
    padding: hp('10'),
    marginTop: hp('10'),
    alignContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 20
  }
});