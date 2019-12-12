import React, { Component } from "react";
import { StyleSheet, Dimensions, View, StatusBar,TouchableOpacity, Text } from "react-native";
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
        <StatusBar hidden={true} />
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
              onPress={() => this.props.navigation.navigate("HomeScreen")}
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
    padding: 10,
    alignContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 20
  }
});