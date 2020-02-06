import React, {Component} from 'react';
import AppNavigator from './navigator/navigator';
import {MenuProvider} from 'react-native-popup-menu';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    );
  }
}
