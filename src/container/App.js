import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header';
import TodoList from '../components/TodoList';
import FloatingActionButton from '../components/FloatingActionButton';
import Spinner from '../components/Spinner';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD_AsenIvyvg_a16ORJfu8q2Fe84axztSo',
  authDomain: 'todo-e4db3.firebaseapp.com',
  databaseURL: 'https://todo-e4db3.firebaseio.com',
  storageBucket: 'todo-e4db3.appspot.com',
});

class App extends Component {

  constructor() {
    super();
    this.state = { isLoading: true, todos: [] };
    this.todosRef = firebaseApp.database().ref('todos/');
  }

  componentWillMount() {
    //get all items
    this.getAllTodos(this.todosRef);
  }

  componentDidMount() {
    //add listeners for listening to child events (like: add, remove, update)
    this.addItemChangeListener(this.todosRef);
    this.addItemAddListener(this.todosRef);
    this.addItemRemoveListener(this.todosRef);
  }

  getAllTodos(todosRef) {
    todosRef.once('value', (snapshots) => {
      //snapshots.val() is an object containg all items with key value pair
      //so iterate over all keys and get individual objects
      const val = snapshots.val();
      const todos = Object.keys(val).map((key) => (
        {
          id: key,
          title: val[key].title,
          body: val[key].body
        }
      ));

      this.setState({ todos, isLoading: false });
    });
  }

  addItemChangeListener(todosRef) {
    todosRef.on('child_changed', (snapshot) => {
      if (snapshot) {
      this.setState({
          todos: [
            ...this.state.todos,
            {
              id: snapshot.key,
              title: snapshot.val().title,
              body: snapshot.val().body
            }
          ]
        });
      }
    });
  }

  addItemRemoveListener(todosRef) {
    todosRef.on('child_removed', (snapshot) => {
      if (snapshot) {
      this.setState({
          todos: [
            ...this.state.todos,
            {
              id: snapshot.key,
              title: snapshot.val().title,
              body: snapshot.val().body
            }
          ]
        });
      }
    });
  }

  addItemAddListener(todosRef) {
    todosRef.on('child_added', (snapshot) => {
      if (snapshot) {
      this.setState({
          todos: [
            ...this.state.todos,
            {
              id: snapshot.key,
              title: snapshot.val().title,
              body: snapshot.val().body
            }
          ]
        });
      }
    });
  }

  renderTodos() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }

    if (this.state.todos && this.state.todos.length > 0) {
      return <TodoList todos={this.state.todos} />;
    }

    const { emptyTodoContainerStyle, emptyTodoTextStyle } = styles;
    return (
      <View style={emptyTodoContainerStyle}>
        <Text style={emptyTodoTextStyle}>Click + to add Todo</Text>
      </View>
    );
  }

  render() {
    const { floatingButtonContainerStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        {/*render header*/}
        <Header title="My Todos" />

        {/*render todos list*/}
        {this.renderTodos()}

        {/*render floating button*/}
        <View style={floatingButtonContainerStyle}>
          <FloatingActionButton buttonText="+" />
        </View>
      </View>

    );
  }
}

const styles = {
  emptyTodoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTodoTextStyle: {
    color: '#d2d2d2',
    fontSize: 40,
    fontWeight: 'bold'
  },
  floatingButtonContainerStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
};

export default App;
