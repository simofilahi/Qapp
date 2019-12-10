import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Button,TouchableOpacity, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class QRCodeScannerScreen extends Component {
  state = {
      scanner: ""
  }
  onSuccess = async e => {
    try
    {
      await this.props.navigation.navigate("SurveyScreen", {
        data: e.data,
        scanner: this.scanner
      });
    }
    catch {
      alert("Try again")
    }
  };
  static navigationOptions = {
    header: null
  };
  render() {
    return (
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
        <View style={{width: 200, marginBottom: 20}}>
              <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
            >
              <Text style={styles.Text}>Cancel</Text>
            </TouchableOpacity>
        </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F5FCFF"
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
  marker: {
      color: 'green'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    alignContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 20
  }
});