import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native';
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import {
  ADD_TODO, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO,
  HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS
} from '../types';
import {ScreenContext} from "../screen/screenContext";
import {Http} from '../../http'

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const {changeScreen} = useContext(ScreenContext)

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post(
        'https://rn-todo-app-b4b5a.firebaseio.com/todos.json',
        {title}
      )
      dispatch({type: ADD_TODO, title, id: data.name.toString()})
    } catch (e) {
      showError('Something went wrong')
    }

  }

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Remove',
      `Do you want remove ${todo.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null)
            try {
              await Http.delete(`https://rn-todo-app-b4b5a.firebaseio.com/todos/${id}.json`)
              dispatch({type: REMOVE_TODO, id})
            } catch (e) {
              showError('Something went wrong...')
            }
          }
        }
      ],
      { cancelable: false }
    );

  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get('https://rn-todo-app-b4b5a.firebaseio.com/todos.json')
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      dispatch({type: FETCH_TODOS, todos})
    } catch (e) {
      showError('Something went wrong...')
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    showLoader()
    clearError()
    try {
      await Http.patch(`https://rn-todo-app-b4b5a.firebaseio.com/todos/${id}.json`, {title})
      dispatch({type: UPDATE_TODO, id, title})
    } catch (e) {
      showError('Something went wrong...')
    } finally {
      hideLoader()
    }

  }

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const hideLoader = () => dispatch({type: HIDE_LOADER})

  const showError = error => dispatch({type: SHOW_ERROR, error})

  const clearError = () => dispatch({type: CLEAR_ERROR})

  return <TodoContext.Provider value={{
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    addTodo,
    removeTodo,
    updateTodo,
    fetchTodos
  }}>{children}</TodoContext.Provider>
}