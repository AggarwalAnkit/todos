import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const Todo = ({ todo }) => {
  const {
    todoContainerStyle,
    titleStyle,
    bodyStyle
  } = styles;
  return (
    <TouchableOpacity style={todoContainerStyle} onPress={() => console.log('pressed')}>
      <View>
        <Text style={titleStyle}>
          {todo.title}
        </Text>
        <Text style={bodyStyle}>
          {todo.body}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  todoContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 10
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  },
  bodyStyle: {
    fontSize: 12,
    color: '#444'
  }
};

export default Todo;
