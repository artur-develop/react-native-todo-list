import React, {useState, useContext} from 'react'
import {View, StyleSheet, Alert} from 'react-native'
import {Navbar} from './components/Navbar'
import {THEME} from './theme'
import {MainScreen} from './screens/MainScreen'
import {TodoScreen} from './screens/TodoScreen'
import {TodoContext} from './context/todo/todoContext'
import {ScreenContext} from './context/screen/screenContext'

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  // const [todoId, setTodoId] = useState(null)
  // const [todos, setTodos] = useState([])

  // const addTodo = (title) => {
  //   setTodos(prev => [...prev, {
  //     id: Date.now().toString(),
  //     title: title
  //   }])
  // }
  //
  // const removeTodo = id => {
  //   const todo = todos.find(t => t.id === id)
  //   Alert.alert(
  //     'Remove',
  //     `Do you want remove ${todo.title}?`,
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel'
  //       },
  //       {
  //         text: 'Remove',
  //         style: 'destructive',
  //         onPress: () => {
  //           setTodoId(null)
  //           setTodos(prev => prev.filter(todo => todo.id !== id))
  //         }
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  //
  // }
  //
  // const updateTodo = (id, title) => {
  //   setTodos(old => old.map(todo => {
  //     if (todo.id === id) {
  //       todo.title = title
  //     }
  //     return todo
  //   }))
  // }

  let content = <MainScreen
    todos={todos}
    // todos={todoContext.todos}
    addTodo={addTodo}
    removeTodo={removeTodo}
    openTodo={id => {changeScreen(id)}}
  />

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen
      goBack={() => {changeScreen(null)}}
      todo={selectedTodo}
      onRemove={removeTodo}
      onSave={updateTodo}
    />
  }


  return (
    <View>
      <Navbar title='Todo App'/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  },
});