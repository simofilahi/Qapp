import React, { Component } from 'react';
import {TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MutiSlider from '@ptomasroos/react-native-multi-slider';
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

import DateTimePicker from '@react-native-community/datetimepicker'
import NumericInput from 'react-native-numeric-input'
import RangeSlider from 'rn-range-slider';

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

export default class SurveyAnswerInput extends Component{
     constructor(props){
       super(props)
       this.state = {
        bool: false,
        date: new Date(),
        mode: null,
        show: false,
        stringDate: null,
        DDselected: 'none',
        MDDselectedItems: [],
       }
     }
     
     setDate = (event, date) => {
      date = date || this.state.date;
      
      this.setState({
        show: false,
        date: date,
        stringDate: (this.state.mode === 'date') ? date.toDateString() : date.toLocaleTimeString()
      });
      }

      show = mode => {
        this.setState({
          show: true,
          mode: mode,
        });
      }

      datepicker = () => {
        this.show('date')
      }

      timepicker = () => {
        this.show('time')
      }

      DDOnChangeValue = (value, id) => {
        this.setState({DDselected: value})
      }

      onSelectedItemsChange = (selectedItems) => {
        console.log(selectedItems)
        this.setState({MDDselectedItems: selectedItems });
      };

    __render = (item, _onChange) => {
      const {stringDate, show, date, mode, DDselected} = this.state
      const type = item.type
      const id = item.name

      switch(type){
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
        case DATETIME_INPUT:
          return (
            <View style={{alignItems: 'center'}}>
              {stringDate ? <Text>{stringDate}</Text> : null}
              {show ? <DateTimePicker 
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate} 
              />: null}
              <Button onPress={this.datepicker}><Text>Select Date and Time</Text></Button>
            </View>
          )
        case DATE_INPUT:
          return (
            <View style={{alignItems: 'center'}}>
              {stringDate ? <Text>{stringDate}</Text> : null}
              {show ? <DateTimePicker 
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />: null}
              <Button onPress={this.datepicker}><Text>Select Date</Text></Button>
            </View>
          )
        case TIME_INPUT:
          return (
            <View style={{alignItems: 'center'}}>
              {stringDate ? <Text>{stringDate}</Text> : null}
              {show ? <DateTimePicker 
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate} 
              />: null}
              <Button onPress={this.timepicker}><Text style={{textAlign: 'justify'}}>Select Time</Text></Button>
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
            <View>
              {/* <Multiselect
                options={item.options} // Options to display in the dropdown
                // selectedvalues={} // Preselected value to persist in dropdown
                onSelect={() => {console.log("hello")}} // Function will trigger on select event
                onRemove={() => {console.log("holla")}} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                /> */}
                {/* <SectionedMultiSelect
                    items={item.options}
                    uniqueKey={id}
                    subKey={item.options.map(el => {
                      return el.id
                    })}
                    selectText="Choose some things..."
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={() => {
                      console.log("hello")
                      // this.onSelectedItemsChange
                    }}
                    showCancelButton={true}
                    onCancel={() => {console.log("cancel")}}
                    onConfirm={() => {console.log("confirm")}}
                    // selectedItems={() => {
                    //   console.log("here")
                    // }}
                /> */}
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
                    animation={true}
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