import React, { Component } from 'react';
import MyHeader from '../header/Header';
import MyFooter from '../footer/Footer';
import HomeBody from '../home/HomeBody';
import { Container } from 'native-base';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
        <Container>
            <MyHeader title={"Home"} backarrow={false}/>
            <HomeBody navigate={navigate}/>
            <MyFooter navigate={navigate}/>
        </Container>
    );
  }
}