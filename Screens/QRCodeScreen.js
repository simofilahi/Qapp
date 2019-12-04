import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Button } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class QRCodeScannerScreen extends Component {
  onSuccess = e => {
    this.props.navigation.navigate("SurveyScreen", {
        data: e.data,
        scanner: this.scanner
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          ref={elem => {
            this.scanner = elem;
          }}
          cameraStyle={{ height: Dimensions.get("window").height }}
        />
          <Button
          title={"Cancel"}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});