import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import {Alert} from 'react-native'
import { Footer, FooterTab, Button, Icon, Text} from 'native-base'

export default class MyFooter extends Component {
  _onPress = (navigate, screen, OverlayOnCall) => {
    if (Platform.OS === "android") {
      NetInfo.fetch().then(state => {
        if (state.isConnected){
          navigate(screen)
        } else Alert.alert("No Internet Connection")
    })}
  }
  render() {
      const {navigate, OverlayOnCall} = this.props;
      return (
      <Footer >
          <FooterTab>
              <Button vertical 
              onPress={() => this._onPress(navigate, 'MapScreen', OverlayOnCall)}>
                <Icon name="map" />
                <Text>Maps</Text>
              </Button>
              <Button 
                vertical 
                onPress={() => this._onPress(navigate, 'SurveyScreen', OverlayOnCall)}
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
