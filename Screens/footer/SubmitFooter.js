import React, { Component } from 'react';
import {Footer, Text} from 'native-base'
import {StyleSheet} from 'react-native';
import { Button } from 'galio-framework';
import {Alert} from 'react-native'

class SubmitFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {_onSubmit} = this.props

    return (
        <Footer style={styles.footerStyle}>
              <Button 
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are sure you want to confirm',
                      [
                        {
                          text: 'No',
                          onPress: () => null,
                        },
                        {
                          text: 'Yes',
                          // 
                          onPress: () => _onSubmit()
                        },
                      ],
                      {cancelable: false},
                    );
                    
                  }}
                  style={styles.buttonStyle}
              >
              <Text 
                style={styles.textStyle}
              >
                {this.props.title}
              </Text>
            </Button>
        </Footer>
    );
  }
}

const styles = StyleSheet.create({
  footerStyle : {
    backgroundColor: '#ffffff'
  },
  buttonStyle: {
    backgroundColor: '#3F51B5',
  },
  textStyle : {
    color: 'white'
  }
});

export default SubmitFooter;
