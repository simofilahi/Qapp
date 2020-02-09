import React, {Component} from 'react';
import {Footer, Text} from 'native-base';
import {StyleSheet} from 'react-native';
// import {Button} from 'galio-framework';
import {Alert} from 'react-native';
import {Button} from 'react-native-elements';

class SubmitFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {_onSubmit, allDone, flag, color, title} = this.props;

    return (
      <Footer
        style={{
          backgroundColor: '#ffffff',
          flexDirection: 'row',
        }}>
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
                  onPress: () => (flag === 0 ? _onSubmit() : allDone()),
                },
              ],
              {cancelable: false},
            );
          }}
          containerStyle={{
            // backgroundColor: 'yellow',
            width: '70%',
            height: '100%',
            justifyContent: 'center',
          }}
          buttonStyle={{
            height: '80%',
            backgroundColor: color,
          }}
          titleStyle={{fontSize: 20}}
          title={title}
        />
      </Footer>
    );
  }
}

export default SubmitFooter;
