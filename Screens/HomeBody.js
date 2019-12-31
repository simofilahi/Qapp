import React, { Component } from 'react';
import {Card, CardItem, Text, Button, Body, View } from 'native-base';
import {Image, StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class App extends Component {
render() {
    const {navigate} = this.props
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
            <CardItem header bordered style={styles.header}>
              {/* <Text>Tips</Text> */}
            </CardItem>
            <CardItem cardBody >
            <CardItem bordered >
              {/* <Image
                source={require('../Assests/img/homeimg.png')}/> */}
            </CardItem>
            <CardItem bordered >
              <Body >
                {/* <Text style={styles.myText}>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text> */}
              </Body>
            </CardItem>
            </CardItem>
            <CardItem footer bordered style={styles.footer}>
                {/* <Button primary style={{alignContent: "center"}}onPress={() => navigate('Sliders')}><Text>Get Started</Text></Button> */}
            </CardItem>
          </Card>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1
  },
  card: {
    height: hp('75%')
  },
  header: {
    height: hp('5%')
  },
  headerText: {
    fontSize: hp('1%')
  },
  body: {
    height: hp('70%')
  },
  footer: {
    height: hp('%')
  },
  // textWrapper: {
  // //   height: hp('10%'),
  // //   width: wp('70%')
  // // },
  // myText: {
  //   fontSize: hp('2%')
  // },
  // cardBody: {
  //   height: hp('100%'),
  //   // margin: hp('5%')
  // },
  // img: {
  //   height: hp('50%'),
  //   width: wp('45%')
  // }
});