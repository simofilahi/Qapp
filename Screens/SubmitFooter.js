import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import {Footer, FooterTab, Text} from 'native-base'
import { Button } from 'galio-framework';

class SubmitFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Footer style={{backgroundColor: 'white'}}>
            <Button style={{backgroundColor: 'white'}}>
                <Text>Submit</Text>
            </Button>
        </Footer>
    );
  }
}

export default SubmitFooter;
