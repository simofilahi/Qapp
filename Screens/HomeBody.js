import React, { Component } from 'react';
import {Content, Card, CardItem, Text, Button, Body, View } from 'native-base';
import {Image} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dimensions, PixelRatio } from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
export default class App extends Component {
render() {
    const {navigate} = this.props
    return (
        <View style={{flex: 1}}>
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
          </View>
    );
  }
}