import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Header,
} from 'react-native';
import MyHeader from './Header';
import MyFooter from './Footer';
import HomeBody from './HomeBody';
import MapScreen from './MapScreen';
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