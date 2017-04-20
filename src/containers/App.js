import React from 'react';
import { Navigator } from 'react-native';

import { initialRoute, configureScene, renderScene } from '../configs/navigation/SceneNavigator';

const App = () => (
  <Navigator
    initialRoute={initialRoute}
    configureScene={configureScene}
    renderScene={renderScene}
  />
);

export default App;
