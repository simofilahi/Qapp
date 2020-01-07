import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import {Alert} from 'react-native'
import { Footer, FooterTab, Button, Icon, Text} from 'native-base'

export default class MyFooter extends Component {
  _onPress = (navigate, screen) => {
    if (Platform.OS === "android") {
      NetInfo.fetch().then(state => {
        if (state.isConnected){
          navigate(screen)
        } else Alert.alert("No Internet Connection")
    })}
  }
  render() {
      const {navigate} = this.props;
      return (
      <Footer >
          <FooterTab>
              <Button vertical 
              onPress={() => this._onPress(navigate, 'MapScreen')}>
                <Icon name="map" />
                <Text>Maps</Text>
              </Button>
              <Button 
                vertical 
                onPress={() => navigate('QRCodeScreen')}
                >
                <Icon name="camera" />
                <Text>QR Scanner</Text>
              </Button>
              <Button vertical onPress={() => {
                navigate('AboutUs')
                }}>
                <Icon name="person" />
                <Text>About us</Text>
              </Button>
          </FooterTab>
      </Footer>
      );
    }
}