import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Spinner} from 'native-base';
var RNFS = require('react-native-fs');
const TWO_SECONDS = 2000;

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  UNSAFE_componentWillMount() {
    let path = RNFS.DocumentDirectoryPath + '/rowid.txt';

    RNFS.readFile(path, 'utf8')
      .then(rowidarray => {
        // console.log('before ==> ', rowidarray);
        rowidarray = JSON.parse(rowidarray);
        // console.log('after ==> ', rowidarray);
        let Surveys = [];
        rowidarray.forEach(elem => {
          let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
          RNFS.readFile(path, 'utf8').then(res => {
            // console.log('content of file_0.txt', res);
            res = JSON.parse(res);
            Surveys.push(res);
            // console.log('Survey ====> ', Surveys);
          });
        });

        setTimeout(() => {
          this.props.navigation.navigate('HomeScreen', {
            TabId: 1,
            data: Surveys,
          });
        }, TWO_SECONDS);
      })
      .catch(err => {
        // console.log('error ***********************88');
        // console.log(err.message);
        setTimeout(() => {
          this.props.navigation.navigate('HomeScreen', {
            TabId: 0,
            data: [],
          });
        }, TWO_SECONDS);
      });
    // this.retrieveData()
    //   .then(data => {
    //     setTimeout(() => {
    //       this.props.navigation.navigate('HomeScreen', {
    //         TabId: 1,
    //         data: data,
    //       });
    //     }, TWO_SECONDS);
    //   })
    //   .catch(err => {
    //     setTimeout(() => {
    //       this.props.navigation.navigate('HomeScreen', {
    //         TabId: 0,
    //         data: [],
    //       });
    //     }, TWO_SECONDS);
    //   });
  }

  retrieveData = () => {
    return new Promise(async (resolve, reject) => {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        resolve(JSON.parse(value));
      } else reject('error');
    });
  };

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
          <Text style={{fontSize: 20}}>Qapp</Text>
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
    width: '20%',
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
