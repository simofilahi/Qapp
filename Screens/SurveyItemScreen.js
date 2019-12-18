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
import { Slider, Block } from 'galio-framework';
import MyHeader from './Header';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { TextInput } from 'react-native-gesture-handler';
import TimePicker from "react-native-24h-timepicker";

const STRING_INPUT = 0
const TEXTAREA_INPUT = 1
const INTEGER_INPUT = 2
const FLOAT_INPUT = 3
const BOOLEAN_INPUT = 4
const DATETIME_INPUT = 5
const DATE_INPUT = 6
const TIME_INPUT = 7
const DROPDROWN_SINGLECHOISE_INPUT = 8
const DROPDROWN_MULTIPLECHOISES_INPUT = 9
const CHECKBOX_INPUT = 10
const RADIO_INPUT = 11
const SLIDER_FROMZERO_INPUT = 12
const SLIDER_RANGE_INPUT = 13

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
      const obj = {
        id: '10',
        value: 'hello'
      }
      this.setState({answer : [...this.state.answer, obj]})
    }
    _onSubmit = () => 
    {
      // const {answer} = this.state.answer
      // console.log(answer)
      console.log("hi")
      const {params} = this.props.navigation.state
      const {answer} = this.state

      params.get_value(answer)
    }
    typeinputrender = (type, item) => {
      // const { params} = this.props.navigation.state
      // params.get_value(value, item)
    //  alert(JSON.stringify(params))
      switch(type){
        case STRING_INPUT:
          return (
            <Item regular>
              <Input placeholder="Typing..." onChange={this._onChange}/>
            </Item>
          )
        case INTEGER_INPUT:
          return (
            <Item regular>
              <Input  keyboardType={'numeric'} placeholder="Typing..." />
            </Item>
          )
        case FLOAT_INPUT:
          return <Text>Nothing</Text>
        case BOOLEAN_INPUT:
          return (
            <View>
              <Left>
              <Switch value={false} />
              </Left>
             
            </View>
          )
        case DATETIME_INPUT:
          return <Text>Nothing</Text>
        case DATE_INPUT:
          return (
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
          )
        case TIME_INPUT:
          return (
            <View>
               <TouchableOpacity
                  onPress={() => this.TimePicker.open()}
                  placeHolderText="Select date"
                >
                </TouchableOpacity>
                <Text style={styles.text}>{this.state.time}</Text>
                <TimePicker
                  ref={ref => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.onCancel()}
                  onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />
            </View>
          )
        case DROPDROWN_SINGLECHOISE_INPUT:
          return (
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2}
              >
                <Picker.Item label="none" value="key0" />
                <Picker.Item label="Wallet" value="key1" />
                <Picker.Item label="ATM Card" value="key2" />
                <Picker.Item label="Debit Card" value="key3" />
                <Picker.Item label="Credit Card" value="key4" />
                <Picker.Item label="Net Banking" value="key5" />
              </Picker>
          )
        case DROPDROWN_MULTIPLECHOISES_INPUT:
          return <Text>Nothing</Text>
        case CHECKBOX_INPUT:
          return ( <RadioForm
                  radio_props={item}
                  initial={0}
                  onPress={(value) => alert('still nothing yet here')}
                />)
        case RADIO_INPUT:
          return <Text>Nothing</Text>
        case SLIDER_FROMZERO_INPUT:
          return (
            <View>
              <Block flex>
                <Slider
                  activeColor='blue'
                  maximumValue={10}
                  value={0}
                  step ={1}
                  onValueChange={() => <View><Text>1</Text></View>}
                />
            </Block>
            </View>
          )
        case SLIDER_RANGE_INPUT:
          return <Text>Nothing</Text>
        case TEXTAREA_INPUT:
          return <TextInput style={{width: '100%'}} rowSpan={10} bordered placeholder="Typing..." />
      }
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
                                      {this.typeinputrender(item.type, item)}
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