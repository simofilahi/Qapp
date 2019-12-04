import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
  } from 'react-native';

export default class SurveyScreen extends Component {
  static navigationOptions = {
    title: 'Survey',
  };
  render() {
    return (
      <View>
        <Text>Hi From Collection page!</Text>
      </View>
    );
  }
}