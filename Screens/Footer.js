import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'
export default class MyFooter extends Component {
render() {
    return (
    <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="map" />
            <Text>Maps</Text>
          </Button>
          <Button vertical onPress={() => {
          this.props.navigate('QRCodeScreen')}}>
            <Icon name="camera" />
            <Text>QR Scanner</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>About us</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}