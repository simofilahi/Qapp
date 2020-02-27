import React, {Component} from 'react';
import {Header, Left, Body, Right, Button, Title, Text} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon} from 'react-native-elements';

class MyHeader extends Component {
  render() {
    const {title, backarrow, TabId, deleteAllRows, feedBack, flag} = this.props;
    let marginValue;
    if (backarrow) marginValue = wp('-15%');
    else marginValue = wp('1%');
    return (
      <Header>
        {backarrow ? (
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" color="white" />
            </Button>
          </Left>
        ) : null}
        <Body style={{marginLeft: marginValue}}>
          <Title>{title}</Title>
        </Body>
        {flag ? (
          <Right>
            <Menu>
              <MenuTrigger>
                <Icon name="more" type="fontAwesome5" color="white" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => {
                    if (TabId === 0) feedBack();
                    else deleteAllRows();
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
        ) : null}
      </Header>
    );
  }
}

export default withNavigation(MyHeader);
