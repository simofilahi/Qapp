import React, { Component } from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { TextInput } from 'react-native-gesture-handler';
import TimePicker from "react-native-24h-timepicker";
import { Slider, Block } from 'galio-framework';
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

SurveyAnswerInput = ({item, _onChange, setDate, onValueChange2, state}) => {
    
    const {type} = item
    const {selected2} = state

    switch(type){
        case STRING_INPUT:
          return (
            <Item regular>
              <Input placeholder="Typing..." onChange={_onChange}/>
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
              onDateChange={setDate}
              disabled={false}
            />
          )
        case TIME_INPUT:
          return (
            <View>
               <TouchableOpacity
                //   onPress={() => this.TimePicker.open()}
                  placeHolderText="Select date"
                >
                </TouchableOpacity>
                {/* <Text style={styles.text}>{this.state.time}</Text> */}
                <TimePicker
                //   ref={ref => {
                //     this.TimePicker = ref;
                //   }}
                //   onCancel={() => this.onCancel()}
                //   onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
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
                selectedValue={selected2}
                onValueChange={onValueChange2}
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

export default SurveyAnswerInput;