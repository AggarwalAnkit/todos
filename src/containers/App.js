import React from 'react';
import { Provider } from 'react-redux';
import { Navigator } from 'react-native';

import { initialRoute, configureScene, renderScene } from '../configs/navigation/SceneNavigator';
import configureStore, { persist } from '../redux/store/ConfigureStore';
import { setLoadingTodos } from '../redux/actions/ActionCreator';

const store = configureStore({});
persist(store, () => store.dispatch(setLoadingTodos(false)));

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
