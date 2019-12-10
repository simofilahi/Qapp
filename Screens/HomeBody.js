import React, { Component } from 'react';
import { Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';
export default class App extends Component {
render() {
    return (
        <Content >
            <Card style={{marginLeft: 15, marginRight: 15, marginTop: "10%"}}>
            <CardItem header bordered >
              <Text>Tips</Text>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered style={{flexDirection: "row", justifyContent: "center"}}>
            <Button primary style={{alignContent: "center"}}onPress={() => navigate('QRCodeScreen')}><Text>Get Started</Text></Button>
            </CardItem>
          </Card>
          {/* <Card>
            <CardItem>
                <Body>
                  <Text>Tips</Text>
                </Body>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
                <CardItem footer bordered style={{flexDirection: "row", justifyContent: "center"}}>
                <Button primary style={{alignContent: "center"}}onPress={() => navigate('QRCodeScreen')}><Text>Get Started</Text></Button>
                </CardItem>
          </Card> */}
          </Content>
    );
  }
}