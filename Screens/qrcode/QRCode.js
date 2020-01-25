import React, { Component } from "react";
import { StyleSheet, Dimensions, View, StatusBar,TouchableOpacity, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-navigation";
import { Button } from "native-base";

export default class QRCodeScannerScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      reader: {
        message: null,
        data: null
      },
      isVisible: true,
    }
  }
  static navigationOptions = {
    header: null
  };
  componentWillUnmount(){
    this.scanner.reactivate()
    this.scanner = ''
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
            // verfieToken(dat)
            alert(data)
            this.setState({reader: {
              message: 'succes',
              data: data
            }});
            setTimeout(() => {
              this.setState({reader: {
                message: null,
                data: null
              }})
            }, 10000);
          }).catch((err)=>{
            this.setState({reader: {
              message: 'failed',
              data: null
            }});
          });
      }
      }
    });
  }
  onSuccess = async e => {
    try
    {
      alert(e.data);
      await this.props.navigation.navigate("SurveyScreen", {
        data: e.data,
        scanner: this.scanner
      });
    }
    catch {
      alert("Try again")
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {
          this.state.isVisible == false
          ? 
                <View style={styles.container}>
                <QRCodeScanner
                  onRead={this.onSuccess}
                  fadeIn={true}
                  showMarker={true}
                  markerStyle={styles.marker}
                  checkAndroid6Permissions={true}
                  ref={elem => {
                    this.scanner = elem;
                  }}
                  cameraStyle= {styles.cameraContainer}
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
          :
            <View style={styles.container}>
              <Overlay
                  isVisible={this.state.isVisible}
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
        }
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