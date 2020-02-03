import React, {Component} from 'react';
import {View, Switch, Left} from 'native-base';

class SwitchComp extends Component {
  render() {
    const {id, boolean, SwitcherOnChange} = this.props;
    return (
      <View>
        <Left>
          <Switch
            value={boolean}
            onChange={e => {
              e.preventDefault();
              SwitcherOnChange(id, e.nativeEvent.value);
            }}
          />
        </Left>
      </View>
    );
  }
}

export default SwitchComp;
