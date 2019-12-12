import React, { Component } from 'react';
import {Content, Card, CardItem, Text, Button, Body } from 'native-base';
import {Image} from 'react-native'

export default class App extends Component {
render() {
    const {navigate} = this.props
    return (
        <Content >
            <Card style={{marginLeft: 15, marginRight: 15, marginTop: "2%", marginBottom: "2%"}}>
            <CardItem header bordered >
              <Text>Tips</Text>
            </CardItem>
            <CardItem cardBody style={{justifyContent: 'center'}}>
              <Image style={{width: 200, height: 275}}
                source={require('../Assests/img/homeimg.png')}/>
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
            <Button primary style={{alignContent: "center"}}onPress={() => navigate('Sliders')}><Text>Get Started</Text></Button>
            </CardItem>
          </Card>
          </Content>
    );
  }
}