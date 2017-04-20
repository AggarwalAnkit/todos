import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header';
import TodoList from '../components/TodoList';
import FloatingActionButton from '../components/FloatingActionButton';
import Spinner from '../components/Spinner';
import CreateOrEditTodo from './CreateOrEditTodo';
import { ROUTE_TYPE_MODAL } from '../configs/navigation/SceneNavigator';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD_AsenIvyvg_a16ORJfu8q2Fe84axztSo',
  authDomain: 'todo-e4db3.firebaseapp.com',
  databaseURL: 'https://todo-e4db3.firebaseio.com',
  storageBucket: 'todo-e4db3.appspot.com',
});

class Home extends Component {

  constructor() {
    super();
    this.state = { isLoading: true, todos: [] };
    this.todosRef = firebaseApp.database().ref('todos/');
    this.createEditTodo = this.createEditTodo.bind(this);
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

  onTodoPressed(todo) {
    this.createEditTodo({ callback: this.editTodo.bind(this), todo });
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
          todos: this.state.todos.map((todo) => {
            if (todo.id === snapshot.key) {
              return {
                id: snapshot.key,
                title: snapshot.val().title,
                body: snapshot.val().body
              };
            }
            return todo;
          })
        });
      }
    });
  }

  addItemRemoveListener(todosRef) {
    todosRef.on('child_removed', (snapshot) => {
      if (snapshot) {
      this.setState({
          todos: this.state.todos.filter(todo => todo.id !== snapshot.key)
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

  saveTodo(title, body) {
    if (!title || !body) {
      return;
    }
    this.setState({ isLoading: true });
    this.todosRef.push({
      title,
      body
    });
    this.setState({ isLoading: false });
  }

  deleteTodo(id) {
    this.setState({ isLoading: true });
    this.todosRef.child(id).remove();
    this.setState({ isLoading: false });
  }

  editTodo(title, body, id) {
    if (!id) {
      return;
    }

    this.setState({ isLoading: true });
    if (!title && !body) {
      this.todosRef.child(id).set(null);
    } else {
      this.todosRef.child(id).set({
        title,
        body
      });
    }
    this.setState({ isLoading: false });
  }

  createEditTodo(passProps, type = ROUTE_TYPE_MODAL) {
    this.props.navigator.push({
      component: CreateOrEditTodo,
      passProps,
      type
    });
  }

  renderTodos() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }

    if (this.state.todos && this.state.todos.length > 0) {
      return (
        <TodoList
          todos={this.state.todos}
          onTodoPressed={(todo) => this.onTodoPressed(todo)}
          deleteTodo={(id) => this.deleteTodo(id)}
        />
      );
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
      <View style={{ flex: 1, paddingBottom: 20 }}>
        {/*render header*/}
        <Header title="My Todos" />

        {/*render todos list*/}
        {this.renderTodos()}

        {/*render floating button if app is not loading*/}
        {
          !this.state.isLoading &&
          <View style={floatingButtonContainerStyle}>
            <FloatingActionButton
              buttonText="+"
              onPress={
                () => (
                  this.createEditTodo({ callback: this.saveTodo.bind(this) })
                )
              }
            />
          </View>
        }
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

export default Home;
