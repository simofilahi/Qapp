import React, { Component } from 'react';
import {
    StyleSheet,
    // Button,
    // View,
    // SafeAreaView,
    // Text,
    // Alert,
    // ScrollView,
} from 'react-native';

// import {
//   Card,
// } from 'react-native-elements'
import MyHeader from './Header';
import MyFooter from './Footer';
import HomeBody from './HomeBody';
import { Container } from 'native-base';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: () => <MyHeader title={"Home"} backarrow={true}/>,
  };
  state = {
    active: null
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
          <HomeBody/>
          <MyFooter navigate={navigate}/>
      </Container>
        // <View style={{ flex: 1 }}>
        //   <Fab
        //     active={this.state.active}
        //     direction="up"
        //     containerStyle={{ }}
        //     style={{ backgroundColor: '#5067FF' }}
        //     position="bottomRight"
        //     onPress={() => this.setState({ active: !this.state.active })}>
        //     <Icon name="share" />
        //     <Button style={{ backgroundColor: '#34A34F' }}>
        //       <Icon name="logo-whatsapp" />
        //     </Button>
        //     <Button style={{ backgroundColor: '#3B5998' }}>
        //       <Icon name="logo-facebook" />
        //     </Button>
        //     <Button disabled style={{ backgroundColor: '#DD5144' }}>
        //       <Icon name="mail" />
        //     </Button>
        //   </Fab>
        // </View>
      // </Container>
      // <View style={styles.Container}>
      //   <Card style={{padding: 10, margin: 10}}>
      //     <Text>Open up App.js to start working on your app!</Text>
      //     <Text>Changes you make will automatically reload.</Text>
      //     <Text>Shake your phone to open the developer menu.</Text>
      //   </Card>
      //   <Card style={{padding: 10, margin: 10}}>
      //     <Button
      //       title="QUICK START"
      //     />
      //   </Card>
      //   <Card style={{padding: 10, margin: 10}}>
      //     <Text>Open up App.js to start working on your app!</Text>
      //     <Text>Changes you make will automatically reload.</Text>
      //     <Text>Shake your phone to open the developer menu.</Text>
      //   </Card>
      //   <Card style={{padding: 10, margin: 10}}>
      //     <Button
      //       onPress={() => navigate('QRCodeScreen')}
      //       title="SCAN QR CODE"
      //     />
      //   </Card>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
    Container: {
        fontSize: 20,
        flex: 0, 
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'white'
    },
    ButtonSection: {
      width: '100%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center'
   },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    bottomView: {
      width: '100%', 
      height: 50, 
      backgroundColor: '#2C3E50',
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
    SubmitButton: {
      backgroundColor: 'green',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
    }
});