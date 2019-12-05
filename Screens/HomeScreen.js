import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    ScrollView,
} from 'react-native';

import {
  Card,
  Header,
} from 'react-native-elements'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {  
        backgroundColor: '#f4511e',  
    },  
    headerTintColor: '#0ff',  
    headerTitleStyle: {  
      fontWeight: 'bold',  
    }, 
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.Container}>
        <Card style={{padding: 10, margin: 10}}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </Card>
        <Card style={{padding: 10, margin: 10}}>
          <Button
            onPress={() => navigate('QRCodeScreen')}
            title="QUICK START"
          />
        </Card>
        <Card style={{padding: 10, margin: 10}}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </Card>
        <Card style={{padding: 10, margin: 10}}>
          <Button
            onPress={()=>{}}
            title="SCAN QR CODE"
          />
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    Container: {
        fontSize: 20,
        flex: 1, 
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'white'
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    bottomView: {
      width: '100%', 
      height: 50, 
      backgroundColor: '#2C3E50',
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
    SubmitButton: {
      backgroundColor: 'green',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
    }
});