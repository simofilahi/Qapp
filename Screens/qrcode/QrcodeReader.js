import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';
import { Overlay } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 
export default class QrcodeReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
          <Text></Text>
      </View>
    );
  }
  
  openPhoto(){
    console.log('ImagePicker');
    ImagePicker.launchImageLibrary({}, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        if(response.uri){
          var path = response.path;
          if(!path){
              path = response.uri;
          }
          QRreader(path).then((data)=>{
            this.setState({reader: {
              message: 'Succes',
              data: data
            }});
            // 十秒后自动清空
            setTimeout(() => {
              this.setState({reader: {
                message: null,
                data: null
              }})
            }, 10000);
          }).catch((err)=>{
            this.setState({reader: {
              message: 'failed',
              data: null
            }});
          });
          
      }
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default QrcodeReader
