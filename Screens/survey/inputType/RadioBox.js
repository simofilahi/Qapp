import React, {Component} from 'react';
import {View} from 'native-base';
import RadioForm from 'react-native-simple-radio-button';

class RadioBox extends Component {
  render() {
    const {selected, id, array, RadioInputHandler} = this.props;

    return (
      <View>
        <RadioForm
          radio_props={array}
          initial={selected}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={'#C0C0C0'}
          selectedButtonColor={'#3F51B5'}
          onPress={e => {
            RadioInputHandler(id, e);
          }}
        />
      </View>
    );
  }
}

export default RadioBox;
