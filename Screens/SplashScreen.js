import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const TWO_SECONDS = 2000;
const {width, height} = Dimensions.get('screen')
export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
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
        height: height,
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