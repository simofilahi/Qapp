import React, { Component } from 'react';
import {Content, Card, CardItem, Text, Button, Body } from 'native-base';
import {Image} from 'react-native'

export default class AboutUsBody extends Component {
render() {
    const {navigate} = this.props
    return (
        <Content>
            <Card style={{marginLeft: 15, marginRight: 15, marginTop: "10%"}}>
            <CardItem header bordered >
              <Text>AboutUs</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                </Text>
              </Body>
            </CardItem>
          </Card>
          </Content>
    );
  }
}