import React, {Component} from 'react';
import {Header, Left, Body, Right, Button, Title, Text} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import Orientation from 'react-native-orientation';
import {Picker} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {Icon} from 'react-native-elements';

class MyHeader extends Component {
  render() {
    const {title, backarrow, TabId, deleteAll, feedBack} = this.props;
    let marginValue;
    if (backarrow) marginValue = wp('2%');
    else marginValue = wp('1%');
    return (
      <Header>
        {backarrow ? (
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        ) : null}
        <Body>
          <Title style={{marginLeft: marginValue}}>{title}</Title>
        </Body>
        <Right>
          <Menu>
            <MenuTrigger>
              <Icon name="more" type="fontAwesome5" color="white" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  if (TabId === 0) feedBack();
                  else deleteAll();
                }}>
                {TabId === 0 ? (
                  <Text style={{color: 'black'}}>Feedback</Text>
                ) : (
                  <Text style={{color: 'red'}}>Discard All</Text>
                )}
              </MenuOption>
            </MenuOptions>
          </Menu>
        </Right>
      </Header>
    );
  }
}

export default withNavigation(MyHeader);
