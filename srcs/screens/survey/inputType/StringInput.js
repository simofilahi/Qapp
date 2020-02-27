import React, {Component} from 'react';
import {View, Item, Input, Textarea} from 'native-base';

class TextComp extends Component {
  render() {
    const {id, text, TextOnChange} = this.props;

    return (
      <View>
        <Item regular>
          <Input
            placeholder="Typing..."
            value={text}
            onChangeText={text => {
              TextOnChange(id, text);
            }}
          />
        </Item>
      </View>
    );
  }
}

class TextareaComp extends Component {
  render() {
    const {id, text, TextOnChange} = this.props;
    return (
      <View>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Typing..."
          value={text}
          onChangeText={text => {
            TextOnChange(id, text);
          }}
        />
      </View>
    );
  }
}

export {TextComp, TextareaComp};
