import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
  } from 'react-native';

export default class SurveyScreen extends Component {
  static navigationOptions = {
    title: 'Survey',
  };
  constructor(props) {
    super(props);
    this.state = { qrCodeData: " " };
  }
  componentDidMount() {
    const qrCodeData = this.props.navigation.getParam("data", "No data read");
    this.setState({ qrCodeData: qrCodeData });
  }
  render() {
    return (
      <View style={styles.baseText}>
          <Text>Hi From Collection page! {this.state.qrCodeData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
      fontSize: 20,
      flex: 1, 
      justifyContent: "center",
      alignItems: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});