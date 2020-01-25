import React, { Component } from 'react';
import MyHeader from '../header/Header';
import MyFooter from '../footer/Footer';
import HomeBody from '../home/HomeBody';
import { Container } from 'native-base';
import Orientation from 'react-native-orientation';
import { StyleSheet, Dimensions, View, StatusBar,TouchableOpacity, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-navigation";
import { Button } from "native-base";

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      orientationtype : null
    }
  }
  static navigationOptions = {
    header: null
  };
  // componentWillMount() {
  //   const initial = Orientation.getInitialOrientation();
  //   if (initial === 'PORTRAIT') {
  //     alert('PORTRAIT')
  //   } else {
  //     // do something else
  //     alert('something else')
  //   }
  // }
  // _orientationDidChange = (orientation) => {
  //   this.setState({orientationtype: orientation})
  //   // console.log("hi")
  //   // if (orientation === 'LANDSCAPE') {
  //   //   alert('Landscape')
  //   //   // do something with landscape layout
  //   // } else {
  //   //   alert('nothing')
  //   //   // do something with portrait layout
  //   // }
  // }
  // componentDidMount() {
  //   // this locks the view to Portrait Mode
  //   // Orientation.lockToPortrait();

  //   // this locks the view to Landscape Mode
  //   // Orientation.lockToLandscape();

  //   // this unlocks any previous locks to all Orientations
  //   // Orientation.unlockAllOrientations();

  //   Orientation.addOrientationListener(this._orientationDidChange);
  // }
  state = {
      isVisible: false
  }
  componentDidMount(){
    this.setState({isVisible: false})
  }
  OverlayOnCall = () => {
    this.setState({isVisible: !this.state.isVisible})
  }
  render() {
    const {navigate} = this.props.navigation;
    // const {orientationtype} = this.state
    // alert(orientationtype)
    return (
        <Container>
            
            
          {
            this.state.isVisible ?
            <View style={styles.container}>
            <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            fullScreen={false}
        >
        <SafeAreaView style={styles.container}>
          <Button 
            style={styles.button}
            onPress={this.openPhoto}
            >
            <Text>
              Upload Qr Code From Gallery
            </Text>
          </Button>
          <Button 
            style={styles.button}
            onPress={() => this.setState({ isVisible: false })}
            >
            <Text>
              Scan Qr Code By Camera
            </Text>
          </Button>
        </SafeAreaView>
      </Overlay>
      </View>
             : 
            <Container>
              <MyHeader title={"Home"} backarrow={false}/>
             <HomeBody navigate={navigate}/>
             <MyFooter navigate={navigate} OverlayOnCall={this.OverlayOnCall}/>
            </Container>
          }
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
    backfaceVisibility: 'hidden'
  },
  marker: {
      borderColor:'white',
  },
  button: {
    alignItems: 'center',
    padding: hp('10'),
    marginTop: hp('10'),
    alignContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 20
  }
});