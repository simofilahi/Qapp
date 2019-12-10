import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

import MyHeader from './Header';
import MyFooter from './Footer';
import HomeBody from './HomeBody';
import { Container } from 'native-base';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: () => <MyHeader title={"Home"} backarrow={true}/>,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
          <HomeBody/>
          <MyFooter navigate={navigate}/>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    Container: {
        fontSize: 20,
        flex: 0, 
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'white'
    },
    ButtonSection: {
      width: '100%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center'
   },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    bottomView: {
      width: '100%', 
      height: 50, 
      backgroundColor: '#2C3E50',
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
    SubmitButton: {
      backgroundColor: 'green',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
    }
});