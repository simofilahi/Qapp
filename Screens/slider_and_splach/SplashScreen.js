import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Spinner} from 'native-base';
var RNFS = require('react-native-fs');

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  async UNSAFE_componentWillMount() {
    let promise = () => {
      return new Promise((resolve, reject) => {
        let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
        RNFS.readFile(path, 'utf8')
          .then(rowidarray => {
            rowidarray = JSON.parse(rowidarray);
            let Surveys = [];
            rowidarray.forEach(async elem => {
              let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
              if (await RNFS.exists(path)) {
                RNFS.readFile(path, 'utf8').then(async res => {
                  res = JSON.parse(res);
                  Surveys.push(res);
                });
                if (rowidarray[elem + 1] == undefined) {
                  resolve(Surveys);
                }
              } else {
                if (rowidarray[elem + 1] == undefined) {
                  resolve(Surveys);
                }
              }
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    };
    promise()
      .then(Surveys => {
        setTimeout(() => {
          this.props.navigation.navigate('HomeScreen', {
            TabId: 1,
            data: Surveys,
          });
        }, 6000);
      })
      .catch(err => {
        setTimeout(() => {
          this.props.navigation.navigate('HomeScreen', {
            TabId: 1,
            data: Surveys,
          });
        }, 6000);
      });
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.img}>
          <Image
            style={{marginLeft: '14%'}}
            source={require('../../Assests/img/survey.png')}
          />
        </View>
        <View style={styles.text}>
          <Text style={{fontSize: 20}}>ImpacTree</Text>
        </View>
        <View style={styles.spinner}>
          <Spinner />
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
