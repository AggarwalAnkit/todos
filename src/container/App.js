import React, { Component } from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import TodoList from '../components/TodoList';
import FloatingActionButton from '../components/FloatingActionButton';

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [
        {
          title: 'Title1',
          body: 'Body1'
        },
        {
          title: 'Title2',
          body: 'Body2'
        }
      ]
    };
  }

  render() {
    const { floatingButtonContainerStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <Header title="My Todos" />

        <TodoList todos={this.state.todos} />

        <View style={floatingButtonContainerStyle}>
          <FloatingActionButton buttonText="+" />
        </View>
      </View>

    );
  }
}

const styles = {
  floatingButtonContainerStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
};

export default App;
