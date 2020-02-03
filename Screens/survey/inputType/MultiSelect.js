import React, {Component} from 'react';
import {View} from 'native-base';
import MultiSelect from 'react-native-multiple-select';

export class MultiSelectComp extends Component {
  render() {
    const {id, array, selectedItems, multiSelectHandler} = this.props;

    return (
      <View>
        <MultiSelect
          hideTags
          items={array}
          uniqueKey={'id'}
          ref={component => {
            this.multiSelect = component;
          }}
          onSelectedItemsChange={event => {
            multiSelectHandler(id, event);
          }}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>
    );
  }
}

export default MultiSelectComp;
