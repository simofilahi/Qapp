import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    ScrollView,
    TextInput
  } from 'react-native';

class SurveyItemScreen extends Component{
    render(){
        return(
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        marginTop: 15,
      },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
  }
});

export default SurveyItemScreen;