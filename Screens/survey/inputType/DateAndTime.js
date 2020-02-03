import React, {Component} from 'react';
import {View} from 'native-base';
import DatePicker from 'react-native-datepicker';

class DateAndTime extends Component {
  render() {
    const {id, datetime, onDateTimeChange} = this.props;

    let value = undefined;
    if (datetime !== '') value = datetime;
    return (
      <View>
        <DatePicker
          style={{width: 300}}
          date={value}
          mode="datetime"
          placeholder="select dateTime"
          format="YYYY-MM-DD h:mm:ss"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => {
            onDateTimeChange(id, date);
          }}
        />
      </View>
    );
  }
}

class DateComp extends Component {
  render() {
    const {id, date, onDateChange} = this.props;

    let value = undefined;
    if (date !== '') value = date;
    return (
      <View>
        <DatePicker
          style={{width: 300}}
          date={value}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => {
            onDateChange(id, date);
          }}
        />
      </View>
    );
  }
}

class TimeComp extends Component {
  render() {
    const {id, time, onTimeChange} = this.props;

    let value = undefined;
    if (time !== '') value = time;

    return (
      <View>
        <DatePicker
          style={{width: 300}}
          date={value}
          mode="time"
          placeholder="select time"
          format="h:mm:ss"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => {
            onTimeChange(id, date);
          }}
        />
      </View>
    );
  }
}

export {DateAndTime, DateComp, TimeComp};
