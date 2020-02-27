import React, { Component } from 'react';
import {Card, CardItem, Text, Button, Body, Icon, Fab } from 'native-base'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class AboutUsBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
render() {
    const {navigate} = this.props
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Card style={styles.CardMrg}>
                <CardItem header bordered >
                  <Text>AboutUs</Text>
                </CardItem>
                <CardItem bordered style={styles.textWrapper}>
                  <Body>
                    <Text style={styles.myText}>
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
                  <Fab
                        active={this.state.active}
                        direction="up"
                        style={{ backgroundColor: '#5067FF' , marginTop:20}}
                        position="bottomRight"
                        onPress={() => {this.setState({ active: !this.state.active })}}>
                        <Icon name="share" />
                            <Button style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="logo-whatsapp" />
                        </Button>
                              <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="logo-facebook" />
                        </Button>
                            <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon name="mail" />
                        </Button>
                    </Fab>
              </Card>
            </ScrollView>
          </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textWrapper: {
    height: hp('45%')
  },
  myText: {
    fontSize: hp('2%')
  },
  CardMrg: {
    height: hp('70'),
    marginTop: hp('10'),
    marginLeft: wp('5'),
    marginRight: wp('5')
  }
});