import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Spinner} from 'native-base';
var RNFS = require('react-native-fs');

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  // load data from local storage;
  GetDataFromStorage = () => {
    return new Promise((resolve, reject) => {
      let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
      RNFS.readFile(path, 'utf8')
        .then(rowidarray => {
          rowidarray = JSON.parse(rowidarray);
          var Surveys = [];
          rowidarray.forEach(async elem => {
            let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
            RNFS.readFile(path, 'utf8')
              .then(res => {
                res = JSON.parse(res);
                if (Surveys.length === 0) {
                  Surveys = [res];
                } else {
                  Surveys = [...Surveys, res];
                }
                if (rowidarray[elem + 1] == undefined) {
                  resolve(Surveys);
                }
              })
              .catch(err => {
                if (rowidarray[elem + 1] == undefined) {
                  resolve(Surveys);
                }
              });
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  componentDidMount() {
    this.GetDataFromStorage()
      .then(Surveys => {
        this.props.navigation.navigate('HomeScreen', {
          TabId: 1,
          data: Surveys,
        });
      })
      .catch(err => {
        this.props.navigation.navigate('HomeScreen', {
          TabId: 0,
          data: [],
        });
      });
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.img}>
          <Image
            style={{marginLeft: '14%'}}
            source={require('../../../Assests/img/survey.png')}
          />
        </View>
        <View style={styles.text}>
          <Text style={{fontSize: 20}}>ImpacTree</Text>
        </View>
        <View style={styles.spinner}>
          <Spinner color="#3F51B5" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '40%',
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    height: 30,
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    height: '30%',
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
