import { combineReducers } from 'redux';
import {
  LOADING_TODOS,
  ON_GET_TODOS,
  ON_UPDATE_TODO,
  ON_DELETE_TODO,
  ON_ADD_TODO
} from '../actions/Types';

const setLoadingTodos = (state = false, action) => {
  switch (action.type) {
      case LOADING_TODOS:
          return action.payload.isLoadingTodos;

      default:
          return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case ON_GET_TODOS:
      return action.payload.todos;

    case ON_UPDATE_TODO:
      return action.payload.todos;

    case ON_DELETE_TODO:
      return action.payload.todos;

    case ON_ADD_TODO:
      return action.payload.todos;

    default:
        return state;
  }
};

export default combineReducers({
  isLoadingTodos: setLoadingTodos,
  todos
});
