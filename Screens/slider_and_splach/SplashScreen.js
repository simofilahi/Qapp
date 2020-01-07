import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, StatusBar, Text } from 'react-native';
const TWO_SECONDS = 2000;
const {width, height} = Dimensions.get('window')

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
          <StatusBar hidden={true} />
          <Image
            style={{width: 64, height: 64}}
            source={require('../../Assests/img/survey.png')}
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
        flex: 0, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
    },
    titleText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#3F51B5'
    },
});