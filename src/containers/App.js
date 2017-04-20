import React from 'react';
import { Navigator } from 'react-native';

import * as SceneNavigator from '../configs/navigation/SceneNavigator';

const App = () => (
  <Navigator
    initialRoute={SceneNavigator.initialRoute}
    configureScene={SceneNavigator.configureScene}
    renderScene={SceneNavigator.renderScene}
  />
);

export default App;
