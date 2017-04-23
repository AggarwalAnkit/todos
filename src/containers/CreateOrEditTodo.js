import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';

class CreateOrEditTodo extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialStateFromProps();
  }

  getInitialStateFromProps() {
    if (this.props.todo) {
      return {
        title: this.props.todo.title,
        body: this.props.todo.body,
        id: this.props.todo.id
      };
    }

    return {
      title: '',
      body: '',
      id: ''
    };
  }

  render() {
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
          value={this.state.title}
          style={titleInputStyle}
          underlineColorAndroid='#00000000'
          onChangeText={(title) => this.setState({ title })}
        />

        <TextInput
          placeholder='Enter Todo Text'
          autoCorrect={false}
          autoCapitalize='none'
          multiline
          numberOfLines={10}
          value={this.state.body}
          style={bodyInputStyle}
          textAlignVertical='top'
          underlineColorAndroid='#00000000'
          onChangeText={(body) => this.setState({ body })}
        />

        {/*render floating button*/}
        <View style={saveButtonContainerStyle}>
          <FloatingActionButton
            buttonText="&#x2713;"
            onPress={() => {
              if (this.props.todo) {
                this.props.callback(this.state.title, this.state.body, this.state.id);
              } else {
                this.props.callback(this.state.title, this.state.body);
              }
              this.props.navigator.pop();
            }}
          />
        </View>
      </View>
    );
  }
}

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
