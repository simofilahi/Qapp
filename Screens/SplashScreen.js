import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FIVE_SECONDS = 5000;

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, FIVE_SECONDS);
  }
  render() {
    return (
      <View style={styles.baseText}>
        <Text>Splash Screen</Text>
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