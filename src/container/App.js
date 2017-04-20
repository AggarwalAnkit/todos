import React, { Component } from 'react';
import { View, Navigator } from 'react-native';

import Home from './Home';
import CreateOrEditTodo from './CreateOrEditTodo';

class App extends Component {
  constructor() {
    super();
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    if (route.title === 'home') {
      return <Home navigator={navigator} />;
    } else if (route.title === 'create_edit_todo') {
      return <CreateOrEditTodo navigator={navigator} callback={route.callback} todo={route.todo} />;
    }

    return <View />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'home' }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default App;
