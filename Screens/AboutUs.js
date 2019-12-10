import React, { Component } from 'react';
import {View, Text} from 'react-native';
import MyHeader from './Header';

export default class AboutUs extends Component {
    static navigationOptions = {
        header: () => <MyHeader title={"AboutUs"} backarrow={true}/>,
    };
render() {
    return (
        <View style={{alignContent: 'center'}}>
            <Text>AboutUs</Text>
        </View>
    );
  }
}