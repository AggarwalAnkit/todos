import React from 'react';
import { View, TextInput } from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';

const CreateOrEditTodo = ({ saveTodo, navigator }) => {
  const {
    titleInputStyle,
    bodyInputStyle,
    saveButtonContainerStyle,
  } = styles;
  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <TextInput
        placeholder='Title'
        autoCorrect={false}
        autoCapitalize='none'
        maxLength={50}
        style={titleInputStyle}
        underlineColorAndroid='#00000000'
        onChangeText={(text) => { this.title = text; }}
      />

      <TextInput
        placeholder='Enter Todo Text'
        autoCorrect={false}
        autoCapitalize='none'
        multiline
        numberOfLines={10}
        style={bodyInputStyle}
        textAlignVertical='top'
        underlineColorAndroid='#00000000'
        onChangeText={(text) => { this.body = text; }}
      />

      {/*render floating button*/}
      <View style={saveButtonContainerStyle}>
        <FloatingActionButton
          buttonText="&#x2713;"
          onPress={() => {
            saveTodo(this.title, this.body);
            navigator.pop();
          }}
        />
      </View>
    </View>
  );
};

const styles = {
  titleInputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 23,
    height: 40
  },
  bodyInputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 10,
    fontSize: 14,
    lineHeight: 23,
    flex: 1
  },
  saveButtonContainerStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
};

export default CreateOrEditTodo;
