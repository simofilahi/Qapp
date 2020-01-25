import React, { Component } from 'react';
import {TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MutiSlider from '@ptomasroos/react-native-multi-slider';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import DateTimePicker from '@react-native-community/datetimepicker'
import NumericInput from 'react-native-numeric-input'
import RangeSlider from 'rn-range-slider';
import MultiSelect from 'react-native-multiple-select';
import {
    Textarea,
    Text,
    Button, 
    Icon, 
    Left, 
    Item,
    Picker,
    Input,
    View,
    Switch
  } from 'native-base';
import {
  STRING_INPUT,
  TEXTAREA_INPUT,
  INTEGER_INPUT,
  FLOAT_INPUT,
  BOOLEAN_INPUT,
  DATETIME_INPUT,
  DATE_INPUT,
  TIME_INPUT,
  DROPDROWN_SINGLECHOISE_INPUT,
  DROPDROWN_MULTIPLECHOISES_INPUT,
  CHECKBOX_INPUT,
  RADIO_INPUT,
  SLIDER_FROMZERO_INPUT,
  SLIDER_RANGE_INPUT
} from './InputTypes'

const items = [{
  id: 0,
  name: 'Ondo',
}, {
  id: 1,
  name: 'Ogun',
}, {
  id: 2,
  name: 'Calabar',
}, {
  id: 3,
  name: 'Lagos',
}, {
  id: 4,
  name: 'Maiduguri',
}, {
  id: 5,
  name: 'Anambra',
}, {
  id: 6,
  name: 'Benue',
}, {
  id: 8,
  name: 'Kaduna',
}, {
  id: 9,
  name: 'Abuja',
}];

export default class SurveyAnswerInput extends Component{
     constructor(props){
       super(props)
       this.state = {
        bool: false,
        date: new Date(),
        mode: null,
        show: false,
        DateString: false,
        TimeString: false,
        flag: 1,
        DDselected: 'none',
        MDDselectedItems: [],
        selectedItems: [],
        DateTimeShow: false
       }
     }
    
    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };
     setTime = (event, date) => {
       if (!(date == undefined)){
          date = date || this.state.date;

          this.setState({
            show: false,
            date: date,
            DisplayTime: (this.state.mode === 'time') ? date.toLocaleTimeString() : false,
          });
       }
     }
     setDate = (event, date) => {
      if (!(date == undefined)){
          date = date || this.state.date;
          this.setState({
            show: false,
            date: date,
            DisplayDate: (this.state.mode === 'date') ? date.toDateString() : false,
          });
        }
      }
      setDate_2 = (event, date, type) => {
        if (date !== undefined && type === 'date'){
            date = date || this.state.date;
            this.setState({
              show: false,
              DateTimeShow: true,
              date: date,
              DisplayDate: (this.state.mode === 'date') ? date.toDateString() : false
            }, () => {
              this.pickerType('time')
            });
          }
          else if (date !== undefined && type === 'time'){
            date = date || this.state.date;
            this.setState({
              show: false,
              DateTimeShow: false,
              date: date,
              DisplayTime: (this.state.mode === 'time') ? date.toLocaleTimeString() : false,
            });
          }
          else if (date === undefined && type === 'date'){
            this.setState({
              show: false,
              DateTimeShow: true
            }, () => {
                this.pickerType('time')
            })
          }
          else if (date === undefined && type === 'time'){
            this.setState({
              show: false,
              DateTimeShow: false
            });
          }
        }
      show = (mode) => {
        this.setState({
          show: true,
          mode: mode
        });
      }
      pickerType = (type) => {
        this.show(type)
      }
      DDOnChangeValue = (value, id) => {
        this.setState({DDselected: value})
      }
    __render = (item, _onChange) => {
      const {DisplayDate,
        DisplayTime,
        show,
        date,
        mode,
        DDselected,
        selectedItems,
        DateTimeShow
      } = this.state

      const type = item.type
      const id = item.name

      switch(type){
        case DATETIME_INPUT:
          return (
            <View style={{alignItems: 'center'}}>
              {DisplayDate ? <Text>Date: {DisplayDate}</Text> : null}
              {DisplayTime ? <Text>Time: {DisplayTime}</Text> : null}
              {show ? <DateTimePicker 
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                  this.setDate_2(event, date, !DateTimeShow ? 'date' : 'time')}
                }
              />: null}
              <Button onPress={() => {
                  this.pickerType('date')
              }}>
                <Text>{!DisplayTime && !DisplayDate ? 'Select Time And Date' : 'Edit Time And Date'}</Text>
              </Button>
            </View>
          )
        case DATE_INPUT:
          return (
            <View style={{alignItems: 'center'}}>
              {DisplayDate ? <Text>{DisplayDate}</Text> : null}
              {show ? <DateTimePicker 
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />: null}
              <Button onPress={() => this.pickerType('date')}>
                <Text>{!DisplayDate ? 'Select Date' : 'Edit Date'}</Text>
              </Button>
            </View>
          )
        case TIME_INPUT:
          return (
            <View style={{alignItems: 'center'}}>
              {DisplayTime ? <Text>{DisplayTime}</Text> : null}
              {show ? <DateTimePicker 
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setTime}
              />: null}
              <Button onPress={() => this.pickerType('time')}>
                <Text style={{textAlign: 'justify'}}>{!DisplayTime ? 'Select Time' : 'Edit Time'}</Text>
              </Button>
            </View>
          )
        case STRING_INPUT:
          return (
            <View>
                <Item regular>
                  <Input 
                    placeholder="Typing..."
                    onChangeText={(text) => {
                      _onChange(id, text)
                    }} 
                  />
                </Item>
            </View>
          )
        case TEXTAREA_INPUT:
            return (
                <View >
                  <Textarea rowSpan={5} 
                    bordered
                    placeholder="Typing..."
                    onChangeText={(text) => {
                      _onChange(id, text)
                    }} 
                   />
                </View>
            )
        case INTEGER_INPUT:
          return (
            <View style={{alignSelf: 'center'}}>
                <NumericInput
                    onChange={(text) => {
                      _onChange(id, text)
                    }}
                    totalWidth={300} 
                    totalHeight={50}
                    iconSize={25}
                    step={1}
                    valueType='real'
                    rounded 
                    textColor='#000000' 
                    iconStyle={{ color: '#3F51B5' }}
                    rightButtonBackgroundColor='white'
                    leftButtonBackgroundColor='white'
                />
            </View>
          )
        case FLOAT_INPUT:
          return (
            <View style={{alignSelf: 'center'}}>
                <NumericInput
                    onChange={(text) => {
                      _onChange(id, text)
                    }}
                    totalWidth={300} 
                    totalHeight={50} 
                    iconSize={25}
                    step={0.5}
                    valueType='real'
                    rounded 
                    textColor='#000000' 
                    iconStyle={{ color: '#3F51B5' }}
                    rightButtonBackgroundColor='white'
                    leftButtonBackgroundColor='white'
                />
            </View>
          )
        case BOOLEAN_INPUT:
          return (
            <View>
              <Left>
                <Switch value={this.state.bool} onChange={() => {
                  _onChange(id, !this.state.bool)
                  this.setState({bool: !this.state.bool})}}
                  />
              </Left>
            </View>
          )

        case DROPDROWN_SINGLECHOISE_INPUT:
          return (
            <View>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={DDselected}
                onValueChange={(value) => {
                  this.DDOnChangeValue(value, id)
                  _onChange(id, value)
                }
                }
              >
                {item.options.map((el, index) => {
                  return (
                    <Picker.Item key={index} label={el.value} value={el.key} />
                  )
                })}
              </Picker>
            </View>
          )
        case DROPDROWN_MULTIPLECHOISES_INPUT:
          return (
        <View style={{ flex: 1 }}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
        </View>
          )
        // case CHECKBOX_INPUT:
        //     return (
        //       <View>
        //           <PickerCheckBox
        //               data={item.options}
        //               headerComponent={<Text style={{fontSize:25}} >items</Text>}
        //               // OnConfirm={(pItems) => this.handleConfirm(pItems)}
        //               ConfirmButtonTitle='OK'
        //               DescriptionField='itemDescription'
        //               KeyField='itemKey'
        //               placeholder='select some items'
        //               arrowColor='#FFD740'
        //               arrowSize={10}
        //               placeholderSelectedItems ='$count selected item(s)'
        //           />
        //       </View>
        //     )
        case RADIO_INPUT:
            return ( 
                <View>
                  <RadioForm
                    radio_props={item.options}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={'#C0C0C0'}
                    selectedButtonColor={'#3F51B5'}
                    onPress={(value) => _onChange(id, value)}
                  />
                </View>
         )
        case SLIDER_FROMZERO_INPUT:
          return (
            <View>
              <RangeSlider
                    style={{width: 300, height: 80}}
                    rangeEnabled={false}
                    min={200}
                    max={1000}
                    step={1}
                    selectionColor="#3F51B5"
                    blankColor="#C0C0C0"
                    labelBackgroundColor="#3F51B5"
                    labelBorderColor="#3F51B5"
                    onValueChanged={(low, high, fromUser) => {
                      console.log(`Low ${low} rangeHigh ${high}`)
                  }}
                />
            </View>
          )
        case SLIDER_RANGE_INPUT:
          return (
            <View>
                <RangeSlider
                    style={{width: 300, height: 80}}
                    gravity={'center'}
                    min={200}
                    max={1000}
                    step={20}
                    selectionColor="#3F51B5"
                    blankColor="#C0C0C0"
                    labelBackgroundColor="#3F51B5"
                    labelBorderColor="#3F51B5"
                    onValueChanged={(low, high, fromUser) => {
                      console.log(`Low ${low} rangeHigh ${high}`)
                  }}
                />
            </View>
          )
      }
    }
    
    render(){
      const {item, _onChange} = this.props;
        return (
          <View>
            {this.__render(
              item,
              _onChange,
            )}
          </View>
        )
  }
}