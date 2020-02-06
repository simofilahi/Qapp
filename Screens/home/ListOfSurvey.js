import React, {Component} from 'react';
import {
  Card,
  CardItem,
  Text,
  Container,
  Content,
  List,
  Right,
  Icon,
  View,
} from 'native-base';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export class ListOfSurvey extends Component {
  saveRow = () => {
    alert('save a row');
  };

  deleteRow = () => {
    alert('Delete row');
  };

  saveAll = () => {
    alert('save all');
  };

  delete = () => {
    alert('delete all');
  };

  _renderRow = (survey, index, navigate) => {
    console.log('yoyoyoyyooyoyoy', survey);
    return (
      <Card>
        <CardItem
          onPress={() => {
            navigate('SurveyScreen', {
              data: survey,
              qrcodeData: survey,
            });
          }}>
          <Text>{`Survey ${index}`}</Text>
          <Right>
            <View
              style={{
                flexDirection: 'row',
                marginRight: '-25%',
              }}>
              <View style={{margin: 2}}>
                <Button
                  buttonStyle={{backgroundColor: 'white'}}
                  onPress={() => this.deleteRow()}
                  icon={
                    <Icon
                      name="trash"
                      type="FontAwesome5"
                      style={styles.iconStyle_1}
                    />
                  }
                />
              </View>
              <View style={{margin: 2}}>
                <Button
                  buttonStyle={{backgroundColor: 'white'}}
                  onPress={() => this.saveRow()}
                  icon={
                    <Icon
                      name="send"
                      type="FontAwesome"
                      color="green"
                      style={styles.iconStyle_2}
                    />
                  }
                />
              </View>
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  };

  render() {
    const {navigate, boolean, Surveys} = this.props;
    return (
      <Container>
        <Content>
          <View
            style={{
              height: 70,
              flexDirection: 'column',
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '60%',
                width: '100%',
                alignSelf: 'center',
              }}>
              <Button
                onPress={() => this.saveAll()}
                title="Submit All"
                // loading
                buttonStyle={{
                  width: '80%',
                  alignSelf: 'center',
                  backgroundColor: '#3F51B5',
                }}
              />
            </View>
          </View>
          {boolean ? (
            <Content padder>
              <List
                dataArray={Surveys}
                keyExtractor={(item, index) => index.toString()}
                renderRow={(item, index) =>
                  this._renderRow(item, index, navigate)
                }></List>
            </Content>
          ) : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle_1: {
    color: 'red',
  },
  iconStyle_2: {
    color: 'green',
  },
});

export default ListOfSurvey;
