import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'

export default class MyFooter extends Component {
  render() {
      const {navigate} = this.props;
      return (
      <Footer>
          <FooterTab>
              <Button vertical onPress={() => {
                navigate('MapScreen')}}>
                <Icon name="map" />
                <Text>Maps</Text>
              </Button>
              <Button vertical onPress={() => {
                navigate('QRCodeScreen')}}>
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