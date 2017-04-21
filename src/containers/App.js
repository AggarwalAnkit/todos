import React from 'react';
import { Provider } from 'react-redux';
import { Navigator } from 'react-native';

import { initialRoute, configureScene, renderScene } from '../configs/navigation/SceneNavigator';
import configureStore from '../redux/store/ConfigureStore';

const store = configureStore({});

const App = () => (
  <Provider store={store} key='provider' >
    <Navigator
      initialRoute={initialRoute}
      configureScene={configureScene}
      renderScene={renderScene}
    />
  </Provider>
);

export default App;
