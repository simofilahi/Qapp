import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {View} from 'native-base';
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
  SLIDER_RANGE_INPUT,
} from './inputType/InputTypes';
import CheckBoxComponent from './inputType/CheckBoxComponent';
import MultiSelectComp from './inputType/MultiSelect';
import SingleSelect from './inputType/SingleSelect';
import RadioBox from './inputType/RadioBox';
import SwitchComp from './inputType/Switch';
import {TextComp, TextareaComp} from './inputType/StringInput';
import {DateAndTime, DateComp, TimeComp} from './inputType/DateAndTime';
import {Number, DecimalNumber} from './inputType/Numbers';

export default class SurveyAnswerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      selectedItems: [],
      array: [],
      boolean: null,
      text: '',
      number: 0,
      date: '',
      time: '',
      datatime: '',
      loading: false,
    };
  }

  // add options value to selectedItems
  checkSquareOnChange = (id, elemkey) => {
    const {array} = this.state;

    const newarr = array.map(elem => {
      if (elem.id === elemkey) {
        return {
          value: elem.value,
          id: elem.id,
          checked: !elem.checked,
        };
      }
      return elem;
    });

    this.setState(
      {
        array: newarr,
      },
      () => {
        const {array} = this.state;
        const {_onChange, updateOptionsInPart, pageId} = this.props;

        let arr = [];
        array.forEach(item => {
          if (item.checked === true) {
            var obj = {};

            obj['id'] = item.id;
            obj['value'] = item.value;
            //
            obj['checked'] = true;
            arr.push(obj);
          }
        });
        let value = '';
        arr.map(elem => {
          value = value.concat(elem.value + ',');
        });
        value = value.slice(0, value.length - 1);
        _onChange(id, value);
        updateOptionsInPart(pageId, id, arr);
      },
    );
  };

  dateConveter = timestamp => {
    return new Promise((resolve, reject) => {
      var date_ob = new Date(timestamp);
      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();

      // month as 2 digits (MM)
      var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

      // date as 2 digits (DD)
      var date = ('0' + date_ob.getDate()).slice(-2);

      date = year + '-' + month + '-' + date;
      resolve(date);
    });
  };

  timeConverter = timestamp => {
    return new Promise((resolve, reject) => {
      var date_ob = new Date(timestamp);

      // hours as 2 digits (hh)
      var hours = ('0' + date_ob.getHours()).slice(-2);

      // minutes as 2 digits (mm)
      var minutes = ('0' + date_ob.getMinutes()).slice(-2);

      // seconds as 2 digits (ss)
      var seconds = ('0' + date_ob.getSeconds()).slice(-2);

      var time = hours + ':' + minutes + ':' + seconds;
      time = `"${time}"`;
      resolve(time);
    });
  };

  dateTimeConverter = timestamp => {
    return new Promise((resolve, reject) => {
      var date_ob = new Date(timestamp);

      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();

      // month as 2 digits (MM)
      var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

      // date as 2 digits (DD)
      var date = ('0' + date_ob.getDate()).slice(-2);

      // hours as 2 digits (hh)
      var hours = ('0' + date_ob.getHours()).slice(-2);

      // minutes as 2 digits (mm)
      var minutes = ('0' + date_ob.getMinutes()).slice(-2);

      // seconds as 2 digits (ss)
      var seconds = ('0' + date_ob.getSeconds()).slice(-2);

      var dateTime =
        year +
        '-' +
        month +
        '-' +
        date +
        ', ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds;
      resolve(dateTime);
    });
  };

  UNSAFE_componentWillMount() {
    const {item} = this.props;

    if (item.type === 0 && item.options.length > 0) {
      let SelectedValue = [];
      item.options.forEach(element => {
        if (element.checked === true) SelectedValue.push(element.id);
      });
      this.setState({
        array: item.options.map(elem => {
          return {
            id: elem.id,
            name: elem.value,
          };
        }),
        selectedItems: SelectedValue,
      });
    } else if (item.type === 1 && item.options.length > 0) {
      let SelectedValue = -1;
      item.options.forEach(element => {
        if (element.checked === true) SelectedValue = element.id;
      });
      this.setState(
        {
          array: item.options.map(elem => {
            return elem;
          }),
          selectedItems: SelectedValue,
        },
        () => {
          this.setState({loading: true});
        },
      );
    } else if (item.type === 2 && item.options.length > 0) {
      let SelectedValue = -2;
      item.options.forEach(element => {
        if (element.checked === true) SelectedValue = element.id;
      });
      this.setState({
        array: item.options.map(elem => {
          return {
            label: elem.value,
            value: elem.id,
          };
        }),
        selected: SelectedValue,
      });
    } else if (item.type === 3 && item.options.length > 0) {
      let SelectedValue = [];
      item.options.forEach(element => {
        if (element.checked === true) SelectedValue.push(element.id);
      });
      this.setState({
        array: item.options.map(elem => {
          return elem;
        }),
        selectedItems: SelectedValue,
      });
    } else if (item.type === 4 && item.options.length > 0) {
      this.setState({
        boolean: item.options[0],
      });
    } else if (
      (item.type === 5 || item.type === 6) &&
      item.options.length > 0
    ) {
      this.setState({
        text: item.options[0],
      });
    } else if (
      (item.type === 7 || item.type === 8) &&
      item.options.length > 0
    ) {
      this.setState({
        number: item.options[0],
      });
    } else if (item.type === 9 && item.options.length > 0) {
      this.setState({
        datetime: item.options[0],
      });
      // this.dateTimeConverter(item.options[0])
      //   .then(res => {
      //     this.setState({
      //       datetime: res,
      //     });
      //   })
      //   .catch(err => {
      //     //
      //   });
    } else if (item.type === 10 && item.options.length > 0) {
      this.setState({
        date: item.options[0],
      });
      // this.dateConveter(item.options[0])
      //   .then(res => {
      //     this.setState({
      //       date: res,
      //     });
      //   })
      //   .catch(err => {
      //     //
      //   });
    } else if (item.type === 11 && item.options.length > 0) {
      this.setState({
        time: item.options[0],
      });
      // this.timeConverter(item.options[0])
      //   .then(res => {
      //     this.setState({
      //       time: res,
      //     });
      //   })
      //   .catch(err => {
      //     //
      //   });
    }
  }

  multiSelectHandler = (id, selectedItems) => {
    this.setState(
      {
        selectedItems,
      },
      () => {
        const {array, selectedItems} = this.state;
        const {_onChange, updateOptionsInPart, pageId} = this.props;
        let newarr = [];

        try {
          selectedItems.forEach(elem => {
            array.filter(element => {
              if (elem === element.id) {
                newarr.push(element);
              }
            });
          });
          var value = '';
          newarr.map(elem => {
            value = value.concat(elem.name + ',');
          });
          value = value.slice(0, value.length - 1);
          _onChange(id, value);
          updateOptionsInPart(pageId, id, newarr);
        } catch {}
      },
    );
  };

  singleSelectHandler = (id, Selected) => {
    this.setState(
      {
        selectedItems: Selected,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;
        if (Selected >= 0) {
          const {array} = this.state;

          // reminder
          let value = array.filter(elem => {
            if (Selected === elem.id) return elem;
          });
          _onChange(id, value[0]['value']);
          updateOptionsInPart(pageId, id, value);
        } else updateOptionsInPart(pageId, id, Selected);
      },
    );
  };

  RadioInputHandler = (id, selected) => {
    const {array} = this.state;
    const {_onChange, updateOptionsInPart, pageId} = this.props;

    try {
      // reminder
      let value = {};

      array.filter(elem => {
        if (selected === elem.value) {
          value = elem;
        }
      });
      _onChange(id, value.label);
      updateOptionsInPart(pageId, id, value);
    } catch {}
  };

  SwitcherOnChange = (id, value) => {
    this.setState(
      {
        boolean: value,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;
        _onChange(id, value);
        updateOptionsInPart(pageId, id, value);
      },
    );
  };

  TextOnChange = (id, text) => {
    this.setState(
      {
        text: text,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;
        _onChange(id, text);
        updateOptionsInPart(pageId, id, text);
      },
    );
  };

  onDateTimeChange = (id, date) => {
    this.setState(
      {
        datetime: date,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;

        // var date_ob = new Date(date.replace(/-/g, '/'));
        // var value = new Date(date_ob).getTime();
        // _onChange(id, value);
        // updateOptionsInPart(pageId, id, value);

        _onChange(id, date);
        updateOptionsInPart(pageId, id, date);
      },
    );
  };

  onDateChange = (id, date) => {
    this.setState(
      {
        date: date,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;
        // var date_ob = new Date(date);

        // var value = new Date(date_ob).getTime();
        // _onChange(id, value);
        // updateOptionsInPart(pageId, id, value);

        _onChange(id, date);
        updateOptionsInPart(pageId, id, date);
      },
    );
  };

  onTimeChange = (id, time) => {
    this.setState(
      {
        time: time,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;

        // var timestamp = '1995-10-17, ' + time;
        // var date_ob = new Date(timestamp.replace(/-/g, '/'));
        // var value = new Date(date_ob).getTime();
        // _onChange(id, value);
        // updateOptionsInPart(pageId, id, value);

        _onChange(id, time);
        updateOptionsInPart(pageId, id, time);
      },
    );
  };

  onNumberChange = (id, number) => {
    this.setState(
      {
        number: number,
      },
      () => {
        const {_onChange, updateOptionsInPart, pageId} = this.props;
        _onChange(id, number);
        updateOptionsInPart(pageId, id, number);
      },
    );
  };

  __render = (item, variable, _onChange) => {
    const {
      selectedItems,
      array,
      boolean,
      text,
      number,
      date,
      time,
      datetime,
      selected,
      loading,
    } = this.state;
    const type = item.type;
    const id = item.id;

    switch (type) {
      case DROPDROWN_MULTIPLECHOISES_INPUT:
        return (
          <View style={{flex: 1}}>
            <MultiSelectComp
              id={id}
              array={array}
              selectedItems={selectedItems}
              multiSelectHandler={this.multiSelectHandler}
            />
          </View>
        );
      case DROPDROWN_SINGLECHOISE_INPUT:
        return (
          <View>
            <SingleSelect
              id={id}
              array={array}
              selectedItems={selectedItems}
              singleSelectHandler={this.singleSelectHandler}
            />
          </View>
        );
      case RADIO_INPUT:
        return (
          <View>
            <RadioBox
              id={id}
              array={array}
              selected={selected}
              RadioInputHandler={this.RadioInputHandler}
            />
          </View>
        );
      case CHECKBOX_INPUT:
        return (
          <View>
            <CheckBoxComponent
              id={id}
              array={array}
              checkSquareOnChange={this.checkSquareOnChange}
            />
          </View>
        );
      case BOOLEAN_INPUT:
        return (
          <View>
            <SwitchComp
              id={id}
              boolean={boolean}
              SwitcherOnChange={this.SwitcherOnChange}
            />
          </View>
        );
      case STRING_INPUT:
        return (
          <View>
            <TextComp id={id} text={text} TextOnChange={this.TextOnChange} />
          </View>
        );
      case TEXTAREA_INPUT:
        return (
          <View>
            <TextareaComp
              id={id}
              text={text}
              TextOnChange={this.TextOnChange}
            />
          </View>
        );
      case INTEGER_INPUT:
        return (
          <View style={{alignSelf: 'center'}}>
            <Number
              id={id}
              number={number}
              onNumberChange={this.onNumberChange}
            />
          </View>
        );
      case FLOAT_INPUT:
        return (
          <View style={{alignSelf: 'center'}}>
            <DecimalNumber
              id={id}
              number={number}
              onNumberChange={this.onNumberChange}
            />
          </View>
        );
      case DATE_INPUT:
        return (
          <View style={{alignItems: 'center'}}>
            <DateComp id={id} date={date} onDateChange={this.onDateChange} />
          </View>
        );
      case TIME_INPUT:
        return (
          <View style={{alignItems: 'center'}}>
            <TimeComp id={id} time={time} onTimeChange={this.onTimeChange} />
          </View>
        );
      case DATETIME_INPUT:
        return (
          <View style={{alignItems: 'center'}}>
            <DateAndTime
              id={id}
              datetime={datetime}
              onDateTimeChange={this.onDateTimeChange}
            />
          </View>
        );
    }
  };

  render() {
    const {item, variables, _onChange, loading} = this.props;

    // remember this. spinner
    return (
      <View>
        {loading ? (
          <View>
            <Spinner visible={loading} textContent={'Loading...'} />
          </View>
        ) : (
          <View>{this.__render(item, variables, _onChange)}</View>
        )}
      </View>
    );
  }
}
