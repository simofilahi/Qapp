import React, {Component} from 'react';
import MyHeader from '../header/Header';
import AboutUsBody from './AboutUsBody';
import {Container} from 'native-base';

export default class AboutUs extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <Container>
        <MyHeader title={'AboutUs'} backarrow={true} flag={0} />
        <AboutUsBody />
      </Container>
    );
  }
}
