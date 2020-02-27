import React, {Component} from 'react';
import {View, Content} from 'native-base';
import NumericInput from 'react-native-numeric-input';

class Number extends Component {
  render() {
    const {id, number, onNumberChange} = this.props;

    return (
      <View>
        <NumericInput
          initValue={number}
          onChange={value => {
            onNumberChange(id, value);
          }}
          totalWidth={300}
          totalHeight={50}
          iconSize={25}
          step={1}
          valueType="real"
          rounded
          textColor="#000000"
          iconStyle={{color: '#3F51B5'}}
          rightButtonBackgroundColor="white"
          leftButtonBackgroundColor="white"
        />
      </View>
    );
  }
}

class DecimalNumber extends Component {
  render() {
    const {id, number, onNumberChange} = this.props;

    return (
      <View>
        <NumericInput
          initValue={number}
          onChange={value => {
            onNumberChange(id, value);
          }}
          totalWidth={300}
          totalHeight={50}
          iconSize={25}
          step={0.5}
          valueType="real"
          rounded
          textColor="#000000"
          iconStyle={{color: '#3F51B5'}}
          rightButtonBackgroundColor="white"
          leftButtonBackgroundColor="white"
        />
      </View>
    );
  }
}

export {Number, DecimalNumber};
