import React, { Component } from 'react';
import {
    StyleSheet,
    // Button,
    // View,
    // SafeAreaView,
    // Text,
    // Alert,
    // FlatList,
  } from 'react-native';
  import { Form, Textarea, List,ListItem,items, Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
  import MyHeader from './Header';
import { TextInput } from 'react-native-gesture-handler';
import Reinput from 'reinput'

export default class SurveyScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { 
      qrCodeData: " ", 
      scanner: undefined 
    };
  }
  componentWillUnmount(){
    // this.scanner.reactivate();
    this.setState({ qrCodeData: "", scanner: undefined });
    this.props.navigation.popToTop()
  }
  componentDidMount() {
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
    const scanner = this.props.navigation.getParam("scanner", () => false);
    this.setState({ qrCodeData: qrCodeData, scanner: scanner });
    const data = this.state.qrCodeData;
     console.log(data)
  }
  render() {
    const data = this.state.qrCodeData;
    const {navigate} = this.props.navigation;

    return (
      <Container>
        <MyHeader title={"Survey"} backarrow={true} navigate={navigate}/>
        <Content>
          <List
            dataArray={data}
            renderRow={(item, index) => {
                return (
                  <Card key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "1%"}}>
                    <CardItem header bordered >
                          <Text>{item}</Text>
                          </CardItem>
                          <CardItem body bordered>
                            <Body>
                              <Form style={{width: '100%'}}>
                                <Textarea style={{width: '100%'}}rowSpan={5} bordered placeholder="Textarea" />
                              </Form>
                            </Body>
                    </CardItem>
                  </Card>
                )
            }}
          >
          <ListItem>
          <Button primary style={{alignContent: "center"}}onPress={() => navigate('QRCodeScreen')}><Text>Next</Text></Button>
          </ListItem>
          </List>
        </Content>
      </Container>
          // {this.state.qrCodeData.map((item, index) => {
          //   return (
          //       <Card key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "10%"}}>
          //         <CardItem header bordered >
          //           <Text>{item}</Text>
          //         </CardItem>
          //         <CardItem body bordered>
          //           <Body>
          //             <Text>
          //               NativeBase is a free and open source framework that enable
          //               developers to build
          //               high-quality mobile apps using React Native iOS and Android
          //               apps
          //               with a fusion of ES6.
          //             </Text>
          //           </Body>
          //         </CardItem>
          //         <CardItem footer bordered style={{flexDirection: "row", justifyContent: "center"}}>
          //         <Button primary style={{alignContent: "center"}}onPress={() => navigate('QRCodeScreen')}><Text>Get Started</Text></Button>
          //         </CardItem>
          //       </Card>
          //   )})}
      //  </Content>
      // </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccc'
  },
  title: {
    textAlign: 'left',
    padding: 20,
    fontSize: 20,
    fontWeight: '700'
  },
  avatar: {
    width: "100%",
    height: 200
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
  }
});