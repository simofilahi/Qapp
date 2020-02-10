import React, {Component} from 'react';
import MyHeader from '../header/Header';
import SurveyAnswerInput from './SurveyAnswerInput';
import SubmitFooter from '../footer/SubmitFooter';
import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet} from 'react-native';
import {
  Form,
  Container,
  Card,
  CardItem,
  Text,
  Body,
  Content,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

class SurveyItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      pageId: null,
      variables: [],
      item: [],
      loading: false,
      isConnected: false,
      isInternetReachable: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  UNSAFE_componentWillMount() {
    const item = this.props.navigation.getParam('item', false);
    const uuid = this.props.navigation.getParam('uuid', false);
    const updateLoading = this.props.navigation.getParam(
      'updateLoading',
      false,
    );
    this.setState(
      {
        uuid: uuid,
        pageId: item.id,
        item: item,
      },
      () => updateLoading(),
    );
  }

  _onChange = (id, newvalue) => {
    // console.log('newvalue ====> ', newvalue);
    this.setState(
      {
        variables: [
          ...this.state.variables.filter(elem => {
            if (elem.id !== id) return true;
          }),
          {id: id, value: newvalue},
        ],
      },
      () => {
        // console.log('variables ===> ', this.state.variables);
      },
    );
  };

  _onSubmit = async () => {
    // console.log('submited data', JSON.stringify(variables));
    const {goBack} = this.props.navigation;
    const {pageId, variables} = this.state;
    const {
      uuid,
      row,
      qrcodeData,
      updateRow,
      updateSentValue,
      PartOnSubmit,
    } = this.props.navigation.state.params;

    promise = () => {
      return new Promise((resolve, reject) => {
        this.setState({loading: true});
        const url = `https://impactree.um6p.ma/api/anon/dataset/${uuid}/part/${pageId}`;
        const data = {
          row: row,
          variables: variables,
        };
        const config = {
          headers: {'X-AUTH-TOKEN': qrcodeData},
        };
        console.log(JSON.stringify(data));
        console.log({pageId: pageId});
        console.log({url: url});
        console.log({qrcodeData: qrcodeData});
        Axios.post(url, data, config)
          .then(res => {
            this.setState({
              loading: false,
            });
            if (
              res.data.extras !== null &&
              res.data.extras !== undefined &&
              res.data.extras.row != undefined &&
              res.data.extras.row != null
            ) {
              updateRow(res.data.extras.row);
            }
            resolve('succes');
          })
          .catch(error => {
            this.setState({
              loading: false,
            });
            updateSentValue();
            reject('failed');
          });
      });
    };
    promise()
      .then(res => {
        PartOnSubmit(pageId, variables)
          .then(res => goBack())
          .catch(err => alert(err));
      })
      .catch(err => {
        PartOnSubmit(pageId, variables)
          .then(res => goBack())
          .catch(err => alert(err));
      });
  };

  _renderRow = (item, variables, index) => {
    const {pageId} = this.state;
    const {updateOptionsInPart} = this.props.navigation.state.params;

    console.log('Items ====> ', item);
    console.log(
      '********************************************************************************\n',
    );
    // console.log('\n\n');
    return (
      <Card key={index} style={styles.cardStyle}>
        <CardItem header bordered>
          <Text>{item.question}</Text>
        </CardItem>
        <CardItem body bordered>
          <Body>
            <Form style={styles.formStyle}>
              <SurveyAnswerInput
                item={item}
                variables={variables}
                _onChange={this._onChange}
                updateOptionsInPart={updateOptionsInPart}
                pageId={pageId}
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
    );
  };

  render() {
    const {variables} = this.state.item;
    const {navigate} = this.props.navigation;
    const {loading, isConnected, isInternetReachable} = this.state;

    // console.log('here variables ===========>', JSON.stringify(variables));
    return (
      <Container style={styles.container}>
        <MyHeader
          title={'SurveyAnswers'}
          flag={0}
          backarrow={true}
          navigate={navigate}
        />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Content>
          <ScrollView>
            {variables !== undefined &&
              variables.map((item, index) => {
                return this._renderRow(
                  item,
                  this.state.variables[index],
                  index,
                );
              })}
          </ScrollView>
        </Content>
        <SubmitFooter
          _onSubmit={this._onSubmit}
          title={
            isConnected && isInternetReachable ? 'Submit' : 'offline Submit'
          }
          flag={0}
          color={isConnected && isInternetReachable ? '#3F51B5' : '#E5E6E8'}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: '1%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  formStyle: {
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccc',
  },
  title: {
    textAlign: 'left',
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
  },
});

export default SurveyItemScreen;
