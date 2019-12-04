import React, { Component } from 'react';
import AppContainer from './Navigator/AppContainer';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
} from 'react-native';
import HomeScreen from './Screens/HomeScreen';

export default class App extends Component {
render() {
    return (
        <AppContainer />
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