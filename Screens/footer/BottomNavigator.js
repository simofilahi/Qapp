import React, {Component} from 'react';
import {View} from 'react-native';
import {Fab, Icon, Button} from 'native-base';
import {Overlay, Text} from 'react-native-elements';
import { heightPercentageToDP } from 'react-native-responsive-screen';

class BottomNavigator extends Component {
  state = {
    isVisible: false,
    open: false,
  }
  render() {
    return (
      <View>
        <Overlay
          overlayStyle={{
            left: 0,
            top: 0,
            opacity: 0.8,
            backgroundColor: 'black',
         }}
              isVisible={this.state.isVisible}
              onPress={() => alert("uuuuuuuu")}
              onBackdropPress={() => console.log("yoyoyoyooy")}
              fullScreen={true}>
                 <View
          style={{
            padding: 5,
            alignSelf: 'center',
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 10,
            zIndex: 5,
            flex: 1
          }}>
            <Fab
               containerStyle={{
                alignSelf: 'center',
                left: 7,
                bottom: -4,
              }}
              active={this.state.open}
              direction="up"
              style={{
                backgroundColor: 'white',
                width: 65,
                height: 65,
                borderRadius: 35,
              }}
              onPress={() => this.setState({isVisible: !this.state.isVisible, open: !this.state.open})}>
              <Icon name="remove" style={{color:"black"}}/>
              {/* <View style={{height: 50, width: 50, marginBottom: 50}}> */}
              <Button style={{backgroundColor: '#34A34F', height: 50, width: 50, borderRadius: 100, marginLeft: -6, marginBottom: 20}} onPress={() => alert("nnnnn")}>
              <Icon name="photos" onPress={() => alert("ccccccc")}/>
              </Button>
              <Button  style={{backgroundColor: '#34A34F', height: 50, width: 50, borderRadius: 100, marginLeft: -6, marginBottom: 30}} onPress={() => alert("nnnnn")}>
                  <Icon name="camera" onPress={() => alert("nnnnn")}/>
                </Button>             
            </Fab>
        </View>
            </Overlay>
        <View
          style={{
            position: 'absolute',
            padding: 5,
            alignSelf: 'center',
            backgroundColor: 'white',
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 10,
            zIndex: 5,
            flex: 1,
          }}>
            <Fab
              containerStyle={{
                alignSelf: 'center',
                left: 7,
                bottom: 2,
              }}
              active={false}
              direction="up"
              style={{
                backgroundColor: 'black',
                width: 65,
                height: 65,
                borderRadius: 35,
              }}
              onPress={() => this.setState({isVisible: !this.state.isVisible, open: !this.state.open})}>
              <Icon name="add" color="white" />
            </Fab>
         </View>
       <View
          style={{
            position: 'absolute',
            backgroundColor: '#3F51B5',
            bottom: 0,
            zIndex: 1,
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}>
          <Icon
            name="map"
            style={{color: 'white', marginLeft: 30}}
            onPress={() => this.doSomething()} // Ex : openDrawer() in react-navigation
          />
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              // backgroundColor: 'red',
  
            }}>

              <Icon
              name="person"
              // type="feather"
              style={{color: 'white', marginRight: 30}}
            />
          
            {/* <Icon name="search" type="feather" color="#fff" /> */}
          </View>
        </View>
      </View>
    );
  }
}

export default BottomNavigator;
