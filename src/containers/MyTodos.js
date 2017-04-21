import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import {
  getAllTodos,
  addItemAddListener,
  addItemChangeListener,
  addItemRemoveListener,
  addTodo,
  deleteTodo,
  editTodo
} from '../redux/actions/ActionCreator';

import Header from '../components/Header';
import TodoList from '../components/TodoList';
import FloatingActionButton from '../components/FloatingActionButton';
import Spinner from '../components/Spinner';
import CreateOrEditTodo from './CreateOrEditTodo';
import { ROUTE_TYPE_MODAL } from '../configs/navigation/SceneNavigator';

class MyTodos extends Component {

  constructor() {
    super();
    this.navigateToCreateOrEditTodo = this.navigateToCreateOrEditTodo.bind(this);
  }

  componentWillMount() {
    //get all items
    this.props.getAllTodos();
  }

  componentDidMount() {
    //add listeners for listening to child events (like: add, remove, update)
    this.props.addItemAddListener();
    this.props.addItemChangeListener();
    this.props.addItemRemoveListener();
  }

  onTodoPressed(todo) {
    this.navigateToCreateOrEditTodo({ callback: this.props.editTodo, todo });
  }

  navigateToCreateOrEditTodo(passProps, type = ROUTE_TYPE_MODAL) {
    this.props.navigator.push({
      component: CreateOrEditTodo,
      passProps,
      type
    });
  }

  renderTodos() {
    if (this.props.isLoadingTodos) {
      return <Spinner size="small" />;
    }

    if (this.props.todos && this.props.todos.length > 0) {
      return (
        <TodoList
          todos={this.props.todos}
          onTodoPressed={(todo) => this.onTodoPressed(todo)}
          deleteTodo={(id) => this.props.deleteTodo(id)}
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
        <Header title={this.props.screenTitle} />

        {/*render todos list*/}
        {this.renderTodos()}

        {/*render floating button if app is not loading*/}
        {
          !this.props.isLoadingTodos &&
          <View style={floatingButtonContainerStyle}>
            <FloatingActionButton
              buttonText="+"
              onPress={
                () => (
                  this.navigateToCreateOrEditTodo({ callback: this.props.addTodo })
                )
              }
            />
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  isLoadingTodos: state.isLoadingTodos
});

const mapDispatchToProps = (dispatch) => ({
  getAllTodos: () => dispatch(getAllTodos()),
  addItemAddListener: () => dispatch(addItemAddListener()),
  addItemChangeListener: () => dispatch(addItemChangeListener()),
  addItemRemoveListener: () => dispatch(addItemRemoveListener()),
  addTodo: (title, body) => dispatch(addTodo(title, body)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  editTodo: (title, body, id) => dispatch(editTodo(title, body, id))
});

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

export default connect(mapStateToProps, mapDispatchToProps)(MyTodos);
