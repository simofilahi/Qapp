import React, { Component } from "react";
import { StyleSheet, Dimensions, View, StatusBar,TouchableOpacity, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-navigation";
import { Button } from "native-base";

class QrCodeReaderMethodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
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

export default QrCodeReaderMethodes;
