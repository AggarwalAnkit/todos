import firebase from 'firebase';

import {
  LOADING_TODOS,
  ON_GET_TODOS,
  ON_ADD_TODO,
  ON_UPDATE_TODO,
  ON_DELETE_TODO
} from './Types';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD_AsenIvyvg_a16ORJfu8q2Fe84axztSo',
  authDomain: 'todo-e4db3.firebaseapp.com',
  databaseURL: 'https://todo-e4db3.firebaseio.com',
  storageBucket: 'todo-e4db3.appspot.com',
});

const todosRef = firebaseApp.database().ref('todos/');

export const setLoadingTodos = (isLoadingTodos) => (
  {
    type: LOADING_TODOS,
    payload: {
      isLoadingTodos
    }
  }
);

const onGetTodos = (todos) => (
  {
    type: ON_GET_TODOS,
    payload: {
      todos
    }
  }
);

const onAddTodo = (todos) => (
  {
    type: ON_ADD_TODO,
    payload: {
      todos
    }
  }
);

const onUpdateTodo = (todos) => (
  {
    type: ON_UPDATE_TODO,
    payload: {
      todos
    }
  }
);

const onDeleteTodo = (todos) => (
  {
    type: ON_DELETE_TODO,
    payload: {
      todos
    }
  }
);

export const getAllTodos = () => (
  (dispatch) => {
    dispatch(setLoadingTodos(true));
    todosRef.once('value', (snapshots) => {
      //snapshots.val() is an object containg all todo items with key value pair
      //so iterate over all keys and get individual objects
      const val = snapshots.val();
      const todos = Object.keys(val).map((key) => (
        {
          id: key,
          title: val[key].title,
          body: val[key].body
        }
      ));
      dispatch(onGetTodos(todos));
      dispatch(setLoadingTodos(false));
    });
  }
);

export const addItemAddListener = () => (
  (dispatch, getState) => {
    todosRef.on('child_added', (snapshot) => {
      if (snapshot) {
        const { todos: currentTodosList } = getState();
        const todos = [
          ...currentTodosList,
          {
            id: snapshot.key,
            title: snapshot.val().title,
            body: snapshot.val().body
          }
        ];
        dispatch(onAddTodo(todos));
      }
    });
  }
);

export const addItemChangeListener = () => (
  (dispatch, getState) => {
    todosRef.on('child_changed', (snapshot) => {
      if (snapshot) {
        const { todos: currentTodosList } = getState();
        const todos = currentTodosList.map((todo) => {
          if (todo.id === snapshot.key) {
            return {
              id: snapshot.key,
              title: snapshot.val().title,
              body: snapshot.val().body
            };
          }
          return todo;
        });
        dispatch(onUpdateTodo(todos));
      }
    });
  }
);

export const addItemRemoveListener = () => (
  (dispatch, getState) => {
    todosRef.on('child_removed', (snapshot) => {
      if (snapshot) {
        const { todos: currentTodosList } = getState();
        const todos = currentTodosList.filter(todo => todo.id !== snapshot.key);
        dispatch(onDeleteTodo(todos));
      }
    });
  }
);

export const addTodo = (title, body) => (
  (dispatch) => {
    if (!title || !body) {
      return;
    }
    dispatch(setLoadingTodos(true));
    todosRef.push({
      title,
      body
    });
    dispatch(setLoadingTodos(false));
  }
);

export const deleteTodo = (id) => (
  (dispatch) => {
    console.log('came here', id);
    dispatch(setLoadingTodos(true));
    todosRef.child(id).remove();
    dispatch(setLoadingTodos(false));
  }
);

export const editTodo = (title, body, id) => (
  (dispatch) => {
    if (!id) {
      return;
    }

    dispatch(setLoadingTodos(true));
    if (!title && !body) {
      todosRef.child(id).set(null);
    } else {
      todosRef.child(id).set({
        title,
        body
      });
    }
    dispatch(setLoadingTodos(false));
  }
);
