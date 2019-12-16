import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Transparent } from 'native-base';
import {StyleSheet, View} from 'react-native';
import { withNavigation } from 'react-navigation';

class MyHeader extends Component {
  render() {
    const {title, backarrow, navigate} = this.props;
    let marginValue;
    if (backarrow)
      marginValue = 0;
    else
      marginValue = 10;
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