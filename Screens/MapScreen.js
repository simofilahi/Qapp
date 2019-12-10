import React, { Component } from 'react';
import {View, Text} from 'react-native';
import MyHeader from './Header';

export default class MapScreen extends Component {
    static navigationOptions = {
        header: () => <MyHeader title={"Map"} backarrow={true}/>,
    };
render() {
    return (
        <View style={{alignContent: 'center'}}>
            <Text>Map</Text>
        </View>
    );
  }
}