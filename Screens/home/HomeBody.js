import React, {Component} from 'react';
import {Card, CardItem, Text, Body, Content, View} from 'native-base';
import {Button} from 'react-native-elements';
import {StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class App extends Component {
  render() {
    const {navigate} = this.props;
    return (
      <Content padder>
        <Card>
          <CardItem header bordered style={styles.header}></CardItem>
          <CardItem bordered>
            <Body>
              <Image
                style={styles.img}
                source={require('../../Assests/img/homeimg.png')}
              />
            </Body>
          </CardItem>
          <CardItem bordered style={{height: hp('10')}}>
            <Body>
              <Text style={styles.Text}>
                NativeBase is a free and open source framework that enable
                developers to build high-quality mobile apps using React Native
                iOS and Android apps with a fusion of ES6.
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered style={styles.footer}>
            <Body>
              <View
                style={{
                  height: '100%',
                  flexDirection: 'column',
                  width: '100%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Button
                  title="Get Started"
                  onPress={() => navigate('Sliders')}
                  buttonStyle={{
                    alignSelf: 'center',
                    width: '70%',
                    backgroundColor: '#3F51B5',
                  }}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maincard: {
    height: hp('75%'),
    marginTop: hp('2%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  header: {
    height: hp('5%'),
  },
  Text: {
    fontSize: hp('2%'),
  },
  body: {
    height: hp('70%'),
  },
  footer: {
    height: hp('10%'),
  },
  img: {
    height: hp('50'),
    width: wp('55'),
    alignSelf: 'center',
  },
  iconStyle_1: {
    color: 'red',
  },
  iconStyle_2: {
    color: 'green',
  },
});
