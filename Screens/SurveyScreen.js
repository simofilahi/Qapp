import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    FlatList,
  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const LIGHT_GRAY = "#D3D3D3"

export default class SurveyScreen extends Component {
  static navigationOptions = {
    title: 'Survey',
  };
  constructor(props) {
    super(props);
    this.state = { qrCodeData: " ", scanner: undefined };
  }
  componentWillUnmount(){
    // this.state.scanner.reactivate();
    this.props.navigation.navigate('HomeScreen')
  }
  componentDidMount() {
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
    const scanner = this.props.navigation.getParam("scanner", () => false);
    this.setState({ qrCodeData: qrCodeData, scanner: scanner });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.qrCodeData}
          renderItem={({item, id})=> (
            <View style={styles.listItem}>
              <Text key={id}>{item}</Text>
              <TextInput 
                // style={styles.textInput}
                placeholder="Typing"
                selectionColor={LIGHT_GRAY}
                underlineColorAndroid={LIGHT_GRAY}
              />
            </View>
          )}
        />
      </View>
    );
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