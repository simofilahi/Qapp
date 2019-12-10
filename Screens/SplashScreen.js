import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TWO_SECONDS = 2000;

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, TWO_SECONDS);
  }
  render() {
    return ( 
      <View style={styles.Container}>
        <Image
          style={{width: 64, height: 64}}
          source={require('../Assests/img/survey.png')}
        />
        <Text style={styles.titleText}>Qapp</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    Container: {
        fontSize: 20,
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FBC02D',
    },
    titleText: {
      fontSize: 60,
      fontWeight: 'bold',
      color: '#2C3E50'
    },
});