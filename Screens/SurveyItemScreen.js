import React, { Component } from 'react';
import {
    StyleSheet, Alert, TouchableOpacity,
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
  Item,
  Spinner,
  DatePicker,
  Picker,
  Input,
  View,
  Switch
} from 'native-base';
import MyHeader from './Header';
import SurveyAnswerInput from './SurveyAnswerInput'


class SurveyItemScreen extends Component{
    constructor(props){
      super(props)
      this.state = {
        answer: [],
        item: [],
        loaded: false,
        chosenDate: new Date(),
        selected2: 'none',
        date: new Date(),
        time: "",
      }
    }
    static navigationOptions = {
      header: null
    };
    componentDidMount() {
        const item = this.props.navigation.getParam("item", "No data read");
        this.setState({ item: item, loaded: {item} ? true : false})
    }
    setDate =  (newDate) => {
      this.setState({chosenDate: newDate})
    }
    onValueChange2  = (value) => {
      this.setState({selected2: value})
    }
    onConfirm(hour, minute) {
      this.setState({ time: `${hour}:${minute}` });
      this.TimePicker.close();
    }
    onCancel() {
      this.TimePicker.close();
    }
    Store_values = () => {
      // var answer = this.state.answer
      const obj = {
        id: '10',
        value: 'hello'
      }
      this.setState({answer : [...this.state.answer, obj]})
    }
    _onChange = () => {
      console.log("yoyoyoyo")
      // const obj = {
      //   id: '10',
      //   value: 'hello'
      // }
      // this.setState({answer : [...this.state.answer, obj]})
    }
    _onSubmit = () => 
    {
      // const {answer} = this.state.answer
      // console.log(answer)
      console.log("hi")
      const {params} = this.props.navigation.state
      const {answer} = this.state

      answer.forEach(element => {
        params.get_value(element)
      });
    }
    loaddata = (loaded, navigate, questions) => {
        if (loaded) {
          return (
            <Content>
              <MyHeader title={"SurveyAnswers"} backarrow={true} navigate={navigate}/>
                <List
                  dataArray={questions}
                  renderRow={(item, index) => {
                      return (
                        <Card key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "1%"}}>
                          <CardItem header bordered >
                                <Text>{item.question}</Text>
                                </CardItem>
                                <CardItem body bordered>
                                  <Body>
                                    <Form style={{width: '100%'}}>
                                      <SurveyAnswerInput 
                                        item={item}
                                        _onChange={this._onChange}
                                        onCancel={this.onCancel}
                                        setDate={this.setDate}
                                        onValueChange2={this.onValueChange2}
                                        onConfirm={this.onConfirm}
                                        state={this.state}
                                      />
                                    </Form>
                                  </Body>
                          </CardItem>
                        </Card>
                        )
                  }}
              >
              </List>
              <Button primary style={{alignContent: "center"}}onPress={this._onSubmit}><Text>Done</Text></Button>
            </Content>
          )
        }
      else{
        return (
          <Content>
            <MyHeader title={"Survey"} backarrow={true} navigate={navigate}/>
            <Spinner color='blue' />
          </Content>
        )
      }
    }
    render(){
      const {variables} = this.state.item
      const {navigate} = this.props.navigation;
      const {loaded} = this.state
        return (
          <Container style={{backgroundColor: "#87cefa"}}>
            {this.loaddata(loaded, navigate, variables)}
          </Container>
        )
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

export default SurveyItemScreen;