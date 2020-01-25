import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import Orientation from 'react-native-orientation';

class MyHeader extends Component {

  render() {
    const {title, backarrow} = this.props;
    let marginValue;
    if (backarrow)
      marginValue = wp('2%');
    else
      marginValue = wp('1%');
    return (
         <Header>
          {backarrow ? <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
          </Left>: null }
          <Body>
            <Title style={{marginLeft: marginValue}}>{title}</Title>
          </Body>
          <Right>
          <Button transparent onPress={() => alert("hello")}>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
    );
  }
}

export default withNavigation(MyHeader);