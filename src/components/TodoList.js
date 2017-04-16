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
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps) });
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
        renderRow={(todo) => <Todo todo={todo} />}
      />
    );
  }
}

export default TodoList;
