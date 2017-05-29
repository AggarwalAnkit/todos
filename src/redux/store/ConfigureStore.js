import { AsyncStorage } from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Reducer';

const configureStore = (initialState) => (
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  )
);

export const persist = (store, callback) => {
  persistStore(store,
    { whitelist: ['todos'], storage: AsyncStorage },
    callback
  );
};

export default configureStore;
