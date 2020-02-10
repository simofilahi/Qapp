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
import {StyleSheet, Image, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export class ListOfSurvey extends Component {
  _renderRow = (survey, sendRow, deleteRow) => {
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
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are sure you want to confirm',
                      [
                        {
                          text: 'No',
                          onPress: () => null,
                        },
                        {
                          text: 'Yes',
                          //
                          onPress: () => deleteRow(survey.rowid),
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
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
                    sendRow(survey, survey.rowid);
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
    const {
      boolean,
      Surveys,
      loading,
      sendRow,
      deleteRow,
      sendAllRows,
    } = this.props;

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
                  onPress={() => sendAllRows()}
                  title="Submit All"
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
                this._renderRow(item, sendRow, deleteRow)
              }></List>
          </Content>
        ) : (
          <View
            style={{
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
