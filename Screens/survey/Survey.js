import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
import {
    List,
    Container,
    Card,
    CardItem,
    Text,
    Icon,
    Right
 } from 'native-base';
import MyHeader from '../header/Header';
import SubmitFooter from '../footer/SubmitFooter'

export default class SurveyScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props)
    this.state = {
      qrcodeData: null,
      data: [],
      response: null,
      uuid: '',
      row: null,
    } 
  }

  componentWillUnmount(){
    // 
    if (this.scanner !== undefined && this.scanner !== null && this.scanner !== false){
      this.scanner.reactivate();
      this.setState({ data: "", scanner: undefined });
      // this.props.navigation.popToTop()
    }
   }

  componentDidMount() {
    const data = this.props.navigation.getParam("data", () => false);
    const qrcodeData = this.props.navigation.getParam("qrcodeData", () => false)
    const scanner = this.props.navigation.getParam("scanner", () => false);

    console.log(scanner)
    this.setState(
      { 
        qrcodeData: qrcodeData,
        data: data,
        uuid: data.uuid,
        scanner: scanner,
      }
    );
  }

  updateRow = (row) => {
    if (row !== null && row !== undefined){
      this.setState(
        {
          row: row,
        }
      )
    }
  }

  _renderRow = (item, index, navigate, uuid, row, qrcodeData) => {
    return (
      <TouchableOpacity  onPress = {
        () => navigate('SurveyItemScreen', 
          {
            updateRow: this.updateRow,
            qrcodeData: qrcodeData,
            uuid: uuid,
            row: row,
            item: item,
          }
        )
        
      }
      activeOpacity={0.5}
      style={{pointerEvents: 'none'}}
      > 
      <Card key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "1%"}}>
        <CardItem header bordered >
            <Text>{item.title}</Text>
            <Right>
              <Icon name="check-circle"
                    type="FontAwesome"
                    style={styles.iconStyle}
                    onPress = {
                      () => navigate('SurveyItemScreen', 
                        {
                          updateRow: this.updateRow,
                          qrcodeData: qrcodeData,
                          uuid: uuid,
                          row: row,
                          item: item,
                        }
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
    const {uuid, row, qrcodeData} = this.state
    const data = this.state.data.parts

    return (
      <Container style={styles.container} >
        <MyHeader 
          title={"Survey"}
          backarrow={true}
          navigate={navigate}
        />
          <List
            dataArray={data}
            keyExtractor = {(item, index) => index.toString()}
            renderRow={(item, index) => this._renderRow(item, index, navigate, uuid, row, qrcodeData)}
          >
          </List>
          <SubmitFooter 
            _senddata={this._senddata}
            title={'All Done'}
          />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  iconStyle: {
    color: 'green',
    marginRight: '-25%'
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


// {
// 	"row": null,
// 	"variables": [
// 		{
// 		    "id": 112,
// 		    "value": "lol"
// 		},
// 		{
// 		    "id": 113,
// 		    "value": "ssas"
// 		}
// 	]
// }