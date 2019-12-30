import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    View
  } from 'react-native';
import {
    Form,
    Textarea,
    List,
    ListItem,
    items,
    Title,
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
 } from 'native-base';
import MyHeader from './Header';
import SurveyItemScreen from './SurveyItemScreen'
import SubmitFooter from './SubmitFooter'
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
      response: {
        uuid: '',
        AnswersOfparts: []
      },
      data: [],
    }
    
}
  componentDidMount(){
    this.setState({data: Data, response: {...this.state.response, uuid: Data.uuid}})
  }

  getAnswers = (PartObj) => {
    var AnswersOfparts = this.state.response.AnswersOfparts
    AnswersOfparts = AnswersOfparts.filter(element => {
      if (element.PartId !== PartObj.PartId)
          return element
    })
    AnswersOfparts.push(PartObj)
    return this.setState({response : {...this.state.response, AnswersOfparts: AnswersOfparts}})
  }
  _senddata = () => {

  }
  // componentDidUpdate(){
  //   const {response} = this.state

  //   console.log(JSON.stringify(response))
  //   console.log("updated")
  // }
  _renderRow = (item, index, navigate) => {
    return (
      <TouchableOpacity  onPress = {
        () => navigate('SurveyItemScreen', 
          {item: item, getAnswers: this.getAnswers}
        )
      }> 
      <Card  key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "1%"}}>
        <CardItem header bordered >
            <Text>{item.title}</Text>
            <Right>
              <Icon name="arrow-forward" 
                    style={{color: 'black', marginRight: '-25%'}}
                    onPress = {
                      () => navigate('SurveyItemScreen', 
                      {item: item, getAnswers: this.getAnswers}
                      )
                  }
              />
            </Right>
        </CardItem>
      </Card>
      </TouchableOpacity>
    )
  }
  render() {
    // const data = this.state.qrCodeData;
    const {navigate} = this.props.navigation;
    
    const data = this.state.data.parts
    return (
      <Container style={{flex: 1, justifyContent: 'center'}}>
        <MyHeader title={"Survey"} backarrow={true} navigate={navigate}/>
          <List
            dataArray={data}
            keyExtractor = {(item, index) => index.toString()}
            renderRow={(item, index) => this._renderRow(item, index, navigate)}
          >
          </List>
          <SubmitFooter _senddata={this._senddata}/>
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