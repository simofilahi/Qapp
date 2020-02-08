import React, {Component} from 'react';
import MyHeader from '../header/Header';
import MyFooter from '../footer/BottomNavigator';
import HomeBody from './HomeBody';
import ListOfSurvey from './ListOfSurvey';
import {Container, Tab, Tabs, Content} from 'native-base';
import Orientation from 'react-native-orientation';
import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import {Overlay} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-navigation';
import {Button} from 'native-base';
var RNFS = require('react-native-fs');

import BottomNavigator from '../footer/BottomNavigator';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientationtype: null,
      boolean: false,
      Surveys: [],
      TabId: 1,
      template: [],
      loading: false,
    };
  }
  static navigationOptions = {
    header: null,
  };

  getDataFromLocalStorage = async () => {
    let promise = new Promise((resolve, reject) => {
      let path = RNFS.DocumentDirectoryPath + '/rowid.txt';
      var Surveys = [];
      RNFS.readFile(path, 'utf8')
        .then(rowidarray => {
          rowidarray = JSON.parse(rowidarray);
          rowidarray.map(elem => {
            let path = RNFS.DocumentDirectoryPath + '/file_' + elem + '.txt';
            console.log('path 2 is =====> ', path);
            RNFS.readFile(path, 'utf8').then(res => {
              res = JSON.parse(res);
              Surveys.push(res);
              if (rowidarray[elem + 1] == undefined) resolve(Surveys);
            });
          });
        })
        .catch(err => {
          reject(err);
        });
    });
    let res = await promise;
    return res;
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    const TabId = newProps.navigation.getParam('TabId', false);
    const flag = newProps.navigation.getParam('flag', false);

    if (flag === 1) {
      // this func called when i press on all done button
      this.setState({loading: true}, () => {
        this.getDataFromLocalStorage()
          .then(data => {
            this.setState({
              Surveys: data,
              TabId: TabId,
              boolean: data.length === 0 ? false : true,
              loading: false,
            });
          })
          .catch();
      });
    } else if (flag === 0) {
      this.setState({
        Surveys: [],
        boolean: false,
        TabId: TabId,
      });
    }
  }

  UNSAFE_componentWillMount() {
    const data = this.props.navigation.getParam('data', false);
    const TabId = this.props.navigation.getParam('TabId', false);

    // this called when i get data from splashScreen
    if (data !== false && TabId !== false) {
      this.setState({
        Surveys: data,
        TabId: TabId,
        boolean: data.length === 0 ? false : true,
      });
    }
  }

  // delete all stucked survey
  deleteAll = () => {
    alert('delete all');
  };

  feedBack = () => {
    alert('feedback');
  };

  // add new survey
  addNewRow = () => {
    const {navigate} = this.props.navigation;
    let path = RNFS.DocumentDirectoryPath + '/rowid.txt';

    RNFS.readFile(path, 'utf8')
      .then(rowidarray => {
        rowidarray = JSON.parse(rowidarray);
        if (rowidarray.length === 0) {
          var rowid = 0;
          rowidarray[0] = 0;
        } else {
          var rowid = rowidarray[rowidarray.length - 1] + 1;
          rowidarray[rowidarray.length] = rowidarray[rowidarray.length - 1] + 1;
        }
        let string = JSON.stringify(rowidarray);
        RNFS.unlink(path, 'utf8')
          .then(res => {
            RNFS.writeFile(path, string, 'utf8')
              .then(res => {
                let path = RNFS.DocumentDirectoryPath + '/template.txt';
                RNFS.readFile(path, 'utf8')
                  .then(template => {
                    template = JSON.parse(template);
                    navigate('SurveyScreen', {
                      data: {...template, rowid: rowid},
                      flag: 1,
                    });
                  })
                  .catch(err => {});
              })
              .catch(err => {});
          })
          .catch(err => {
            RNFS.writeFile(path, string, 'utf8')
              .then(res => {})
              .catch(err => {});
          });
      })
      .catch(err => {});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {boolean, Surveys, TabId, loading} = this.state;

    return (
      <Container>
        <MyHeader
          title={'Home'}
          backarrow={false}
          TabId={TabId}
          deleteAll={this.deleteAll}
          feedBack={this.feedBack}
        />
        <Tabs
          locked={true}
          initialPage={TabId}
          page={TabId}
          tabBarPosition="overlayTop"
          scrollWithoutAnimation={true}
          onChangeTab={e => this.setState({TabId: e.i})}>
          <Tab heading="Guide">
            <HomeBody navigate={navigate} />
          </Tab>
          <Tab heading="Survey">
            <ListOfSurvey
              boolean={boolean}
              Surveys={Surveys}
              navigate={navigate}
              loading={loading}
            />
          </Tab>
        </Tabs>
        <MyFooter
          navigate={navigate}
          TabId={TabId}
          addNewRow={this.addNewRow}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
    backfaceVisibility: 'hidden',
  },
  marker: {
    borderColor: 'white',
  },
  button: {
    alignItems: 'center',
    padding: hp('10'),
    marginTop: hp('10'),
    alignContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 20,
  },
});
