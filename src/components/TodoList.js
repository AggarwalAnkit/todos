import React, { Component } from 'react';
import { ListView } from 'react-native';
import Todo from './Todo';

class TodoList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.todos)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({ dataSource: ds.cloneWithRows(nextProps.todos) });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={
          (todo) =>
          <Todo
            key={todo.id}
            todo={todo}
            onPress={() => this.props.deleteTodo(todo.id)}
          />
        }
      />
    );
  }
}

export default TodoList;
