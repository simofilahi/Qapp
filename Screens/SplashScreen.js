import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TWO_SECONDS = 2000;

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, TWO_SECONDS);
  }
  render() {
    return (
      <View style={styles.baseText}>
        <Text style={styles.titleText}>Qapp</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 20,
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#2C3E50',
    },
    titleText: {
      fontSize: 60,
      fontWeight: 'bold',
      color: '#F4D03F'
    },
});