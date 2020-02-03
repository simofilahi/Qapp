import React, {Component} from 'react';
import {View, Picker, Icon} from 'native-base';

class SingleSelect extends Component {
  render() {
    const {id, array, selectedItems, singleSelectHandler} = this.props;
    return (
      <View>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          style={{width: undefined}}
          placeholder="Select "
          placeholderStyle={{color: '#bfc6ea'}}
          placeholderIconColor="#007aff"
          selectedValue={selectedItems}
          onValueChange={selectedItem => {
            singleSelectHandler(id, selectedItem);
          }}>
          <Picker.Item key={-1} label={'Select '} value={-1} />
          {array.length > 0 &&
            array.map((elem, index) => {
              return (
                <Picker.Item key={index} label={elem.value} value={index} />
              );
            })}
        </Picker>
      </View>
    );
  }
}

export default SingleSelect;
