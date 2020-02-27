import React, {Component} from 'react';
import {View, ListItem, List, Text} from 'native-base';
import CheckBox from '@react-native-community/checkbox';

export default class CheckBoxComponent extends Component {
  render() {
    const {id, array, checkSquareOnChange} = this.props;

    return (
      <View>
        <List>
          {array !== undefined &&
            array.map((elem, index) => {
              return (
                <ListItem key={index} style={{marginLeft: 0}}>
                  <CheckBox
                    value={elem.checked}
                    onValueChange={e => {
                      checkSquareOnChange(id, elem.id);
                    }}
                    tintColors={{true: '#3F51B5'}}
                  />
                  <Text style={{margin: 10}}>{elem.value}</Text>
                </ListItem>
              );
            })}
        </List>
      </View>
    );
  }
}
