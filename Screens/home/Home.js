import React, {Component} from 'react';
import MyHeader from '../header/Header';
import MyFooter from '../footer/Footer';
import HomeBody from '../home/HomeBody';
import {Container} from 'native-base';
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
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientationtype: null,
      boolean: false,
      Surveys: [],
    };
  }
  static navigationOptions = {
    header: null,
  };

  state = {
    isVisible: false,
  };

  async componentDidMount() {
    // await AsyncStorage.removeItem('data');
    this.setState({isVisible: false}, () => {
      this.retrieveData();
    });
  }

  OverlayOnCall = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  retrieveData = async () => {
    const {navigate} = this.props.navigation;
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            {
              text: 'Ask me later',
              onPress: () => console.log('Ask me later pressed'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                this.setState({
                  boolean: true,
                  Surveys: [data],
                });
                const data = JSON.parse(value);

                // console.log('data in the beging ====>', data);
                // navigate('SurveyScreen', {
                //   data: data,
                //   qrcodeData: data.qrcodeData,
                //   scanner: false,
                // });
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const {boolean, Surveys} = this.state;

    return (
      <Container>
        {this.state.isVisible ? (
          <View style={styles.container}>
            <Overlay
              isVisible={this.state.isVisible}
              onBackdropPress={() => this.setState({isVisible: false})}
              fullScreen={false}>
              <SafeAreaView style={styles.container}>
                <Button style={styles.button} onPress={this.openPhoto}>
                  <Text>Upload Qr Code From Gallery</Text>
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => this.setState({isVisible: false})}>
                  <Text>Scan Qr Code By Camera</Text>
                </Button>
              </SafeAreaView>
            </Overlay>
          </View>
        ) : (
          <Container>
            <MyHeader title={'Home'} backarrow={false} />
            <HomeBody navigate={navigate} boolean={boolean} Surveys={Surveys} />
            <MyFooter navigate={navigate} OverlayOnCall={this.OverlayOnCall} />
          </Container>
        )}
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
