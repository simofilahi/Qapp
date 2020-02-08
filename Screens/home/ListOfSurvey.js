import React, {Component} from 'react';
import {
  Card,
  CardItem,
  Container,
  Content,
  List,
  Right,
  Icon,
  View,
} from 'native-base';
import {Button, Text} from 'react-native-elements';
import {StyleSheet, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
var RNFS = require('react-native-fs');

export class ListOfSurvey extends Component {
  saveRow = () => {
    alert('save a row');
  };

  deleteRow = rowid => {
    let path = RNFS.DocumentDirectoryPath + '/' + 'file_' + rowid + '.txt';

    RNFS.unlink(path, 'utf8')
      .then(res => {
        alert('Delete row was succesfull');
      })
      .catch(err => {
        alert(err);
      });
  };

  saveAll = () => {
    alert('save all');
  };

  _renderRow = (survey, index, navigate) => {
    // console.log('yoyoyoyyooyoyoy', survey);
    return (
      <Card>
        <CardItem>
          <Text>{`Survey ${survey.rowid}`}</Text>
          <Right>
            <View
              style={{
                flexDirection: 'row',
                marginRight: '-25%',
              }}>
              <View style={{margin: 2}}>
                <Button
                  buttonStyle={{backgroundColor: 'white'}}
                  onPress={() => this.deleteRow(survey.rowid)}
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
                  onPress={() => {
                    navigate('SurveyScreen', {
                      data: survey,
                      flag: 0,
                    });
                    // this.saveRow();
                  }}
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
    const {navigate, boolean, Surveys, loading} = this.props;

    // console.log(
    //   'Data  ********************* => and boolean ==> ',
    //   JSON.stringify(Surveys),
    //   boolean,
    // );
    return (
      <Container>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: 'white'}}
        />
        {boolean ? (
          <Content padder>
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
            <List
              dataArray={Surveys}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item, index) =>
                this._renderRow(item, index, navigate)
              }></List>
          </Content>
        ) : (
          <View
            style={{
              // flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              height: '100%',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
                width: '70%',
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  marginRight: '5%',
                }}
                source={require('../../Assests/img/empty.png')}
              />
              <Text>List is empty</Text>
            </View>
          </View>
        )}
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

/*

  - scan button :
          - create rowid file.
          - create template file.
          - add rowid to survey.
          - redirect to survey screen with passing survey to this screen.
  - add button
          - read rowid file and get last id .
          - read template file.
          - add rowid to template.
          - redirect to survey screen with passing survey to this screen.
  - submit button :
          - online submit :
                            - send variable array that include answers to backend server that all.
          - offline submit : 
                            - add variable answers to the page that realted to this one.
                            - create file named by file_ + rowid of survey .
                            
  - done Button:
          online submit : 
                        - redirect to home page and especially Survey tab get the surveys from local storge and display.
          offline submit : 
                        - make a loop trough all answer from each page and create one.
                        - redirect to home page and especially Survey tab get the surveys from local storge and display.

*/
