import React, {Component} from 'react';
import AppNavigator from './srcs/navigator/navigator';
import {MenuProvider} from 'react-native-popup-menu';
import {pushNotifications} from './srcs/services/index';
import PushNotification from 'react-native-push-notification';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    );
  }
}
