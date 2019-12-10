import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Transparent } from 'native-base';
import {StyleSheet, View} from 'react-native';

export default class MyHeader extends Component {
  render() {
    const {title, backarrow} = this.props;
    console.log(backarrow)
    console.log(title)
    return (
        <Header>
          {backarrow ? <Left>
              <Button transparent >
                <Icon name='arrow-back' />
              </Button>
          </Left>: null }
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    );
  }
}

const styles = StyleSheet.create({
    TextStyle: {
        marginLeft: 20,
    }
});