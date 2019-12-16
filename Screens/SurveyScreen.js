import React, { Component } from 'react';
import {
    StyleSheet
  } from 'react-native';
import { Form, Textarea, List,ListItem,items, Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import MyHeader from './Header';
import SurveyItemScreen from './SurveyItemScreen'
import Data from './data'

export default class SurveyScreen extends Component {
  static navigationOptions = {
    header: null
  };
  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     qrCodeData: " ", 
  //     scanner: undefined 
  //   };
  // }
  // componentWillUnmount(){
  //   // this.scanner.reactivate();
  //   this.setState({ qrCodeData: "", scanner: undefined });
  //   this.props.navigation.popToTop()
  // }
  // componentDidMount() {
  //   const qrCodeData = this.props.navigation.getParam("data", "No data read");
  //   const scanner = this.props.navigation.getParam("scanner", () => false);
  //   this.setState({ qrCodeData: qrCodeData, scanner: scanner });
  //   const data = this.state.qrCodeData;
  //    console.log(data)
  // }
  constructor(props){
    super(props)
    this.state = {
      data: [],
    }
    
}
  componentDidMount(){
    this.setState({data: Data})
  }
  render() {
    // const data = this.state.qrCodeData;
    const {navigate} = this.props.navigation;

    const {data} = this.state
    return (
      <Container style={{flex: 1, justifyContent: 'center'}}>
        <MyHeader title={"Survey"} backarrow={true} navigate={navigate}/>
        <Content>
          <List
            dataArray={data}
            renderRow={(item, index) => {
                return (
                  <Card key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "1%"}}>
                    <CardItem header bordered>
                          <Text>{item.title}</Text>
                        <Right>
                          <Icon name="arrow-forward" 
                                style={{color: 'black', marginRight: '-25%'}}
                                onPress = {
                                  () => navigate('SurveyItemScreen', 
                                    {item}
                                  )
                               }
                          />
                        </Right>
                    </CardItem>
                  </Card>
                )
            }}
          >
          </List>
          <Button disabled>
              <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
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