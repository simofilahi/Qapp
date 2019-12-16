import React, { Component } from 'react';
import {
    StyleSheet,
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
  Spinner
} from 'native-base';
import MyHeader from './Header';
import { TextInput } from 'react-native-gesture-handler';

class SurveyItemScreen extends Component{
    constructor(props){
      super(props)
      this.state = {
        item: [],
        loaded: false
      }
    }
    componentDidMount() {
        const item = this.props.navigation.getParam("item", "No data read");
        this.setState({ item: item, loaded: {item} ? true : false})
    }
    static navigationOptions = {
      header: null
    };
    typeinputrender = (type) => {
      switch(type){
        case 'input_string':
          return <TextInput style={{width: '100%'}} bordered placeholder="Typing..." />
        case 'input_integer':
          return <TextInput  keyboardType={'numeric'}  style={{width: '100%'}} bordered placeholder="Typing..." />
      }
    }
    loaddata = (loaded, navigate, questions) => {
        if (loaded) {
          return (
            <Content>
              <MyHeader title={"Survey"} backarrow={true} navigate={navigate}/>
                <List
                  dataArray={questions}
                  renderRow={(item, index) => {
                      return (
                        <Card key={index} style={{marginLeft: 15, marginRight: 15, marginTop: "1%"}}>
                          <CardItem header bordered >
                                <Text>{item.questionText}</Text>
                                </CardItem>
                                <CardItem body bordered>
                                  <Body>
                                    <Form style={{width: '100%'}}>
                                      {this.typeinputrender(item.questionType)}
                                    </Form>
                                  </Body>
                          </CardItem>
                        </Card>
                        )
                  }}
              >
              </List>
              <Button primary style={{alignContent: "center"}}onPress={() => navigate('Sliders')}><Text>Done</Text></Button>
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
      const {questions} = this.state.item
      const {navigate} = this.props.navigation;
      const {loaded} = this.state
        return (
          <Container style={{backgroundColor: "#87cefa"}}>
            {this.loaddata(loaded, navigate, questions)}
          </Container>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});

export default SurveyItemScreen;