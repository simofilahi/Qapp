import React, { Component } from 'react';
import AppNavigator from './Navigator/AppNavigator';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import platform from './native-base-theme/variables/platform';

export default class App extends Component {
render() {
       return (
         // <StyleProvider style={getTheme()}>
                <AppNavigator />
         // </StyleProvider>
       ); 
  }
}
