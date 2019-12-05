import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    ScrollView,
    TextInput
  } from 'react-native';

class SurveyItemScreen extends Component{

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.inputContainer}>
                    <FlatList
                            data={DATA}
                            renderItem={({ item }) => (
                            <Item
                                id={item.id}
                                title={item.title}
                                selected={!!selected.get(item.id)}
                                onSelect={onSelect}
                            />
                            )}
                            keyExtractor={item => item.id}
                            extraData={selected}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        marginTop: 15,
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

export default SurveyItemScreen;