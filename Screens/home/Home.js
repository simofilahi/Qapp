import React, { Component } from 'react';
import MyHeader from '../header/Header';
import MyFooter from '../footer/BottomNavigator';
import HomeBody from './HomeBody';
import ListOfSurvey from './ListOfSurvey';
import { Container, Tab, Tabs, Content } from 'native-base';
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
import { QRreader } from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'native-base';

import BottomNavigator from '../footer/BottomNavigator';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientationtype: null,
      boolean: false,
      Surveys: [],
      TabId: 1,
    };

  }
  static navigationOptions = {
    header: null,
  };

  UNSAFE_componentWillMount() {
    const data = this.props.navigation.getParam('data', false);
    const TabId = this.props.navigation.getParam('TabId', false);

    console.log("data ====>", data)
    console.log("tabid ==> ", TabId)
    if (data !== false && TabId !== false) {
      this.setState({
        Surveys: data,
        TabId: TabId,
        boolean: true
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { boolean, Surveys, TabId } = this.state;

    return (
      <Container>
        <MyHeader title={'Home'} backarrow={false} />
        <Tabs
          initialPage={TabId}
          tabBarPosition="overlayTop"
          scrollWithoutAnimation={true}
          onChangeTab={(e) => this.setState({ TabId: e.i })}>
          <Tab heading="Guide" >
            <HomeBody />
          </Tab>
          <Tab heading="Survey">
            <ListOfSurvey
              boolean={boolean}
              Surveys={Surveys}
              navigate={navigate}
            />
          </Tab>
        </Tabs>
        <MyFooter navigate={navigate} />
      </Container >
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
