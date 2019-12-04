import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
  } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.baseText}>
        <Text>Hi Collector!</Text>
        <Button
          title="SCAN QR CODE"
          onPress={() => navigate('QRCodeScreen')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    baseText: {
        fontSize: 20,
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
});