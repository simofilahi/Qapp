import React, {Component} from 'react';
import {Card, CardItem, Text, Button, Body, Icon, Fab} from 'native-base';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class AboutUsBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
    const {navigate} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card style={styles.CardMrg}>
            <CardItem header bordered>
              <Text>AboutUs</Text>
            </CardItem>
            <CardItem bordered style={styles.textWrapper}>
              <Body>
                <Text style={styles.myText}>
                  This app was launched as a part of Data2Impact that aims to
                  provide actionable insights on smallholder farmers challenges
                  across Africa. Data2Impact is an open-data corpus of ImpacTree
                  that offers the necessary tools to collect, cleanse, visualize
                  and analyze data in the following clusters: Education, Health,
                  Finance, Energy, Water and Sanitation, Transportation and
                  Environment. To know more about ImpacTree and the
                  functionalities that we offer through Data2Impact, visit our
                  web platform via the following link: impactree.um6p.ma
                </Text>
              </Body>
            </CardItem>
            <Fab
              active={this.state.active}
              direction="up"
              style={{backgroundColor: '#5067FF', marginTop: 20}}
              position="bottomRight"
              onPress={() => {
                this.setState({active: !this.state.active});
              }}>
              <Icon name="share" />
              <Button style={{backgroundColor: '#34A34F'}}>
                <Icon name="logo-whatsapp" />
              </Button>
              <Button style={{backgroundColor: '#3B5998'}}>
                <Icon name="logo-facebook" />
              </Button>
              <Button disabled style={{backgroundColor: '#DD5144'}}>
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
  container: {flex: 1},
  textWrapper: {
    height: hp('45%'),
  },
  myText: {
    fontSize: hp('2%'),
  },
  CardMrg: {
    height: hp('70'),
    marginTop: hp('10'),
    marginLeft: wp('5'),
    marginRight: wp('5'),
  },
});
