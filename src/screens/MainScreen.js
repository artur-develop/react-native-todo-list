import React, {useState, useEffect, useContext} from 'react'
import {View, StyleSheet, FlatList, Text, Image} from 'react-native'
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import {Dimensions} from "react-native-web";
import {THEME} from "../theme";
import {TodoContext} from '../context/todo/todoContext';
import {ScreenContext} from "../context/screen/screenContext";

export const MainScreen = () => {
  const {addTodo, todos, removeTodo} = useContext(TodoContext)
  const {changeScreen} = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const update = () => {
      const width = useState(Dimensions.get('window').width)
      setDeviceWidth(width)
    }
    Dimensions.addEventListener('change', update)
    return () => {
      Dimensions.removeEventListener('change')
    }
  })

  let content = (
    <View style={{width: deviceWidth}}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>
        )}
      />
    </View>
  )

  if (todos.length === 0) {
    content = <View style={styles.imgWrap}>
      <Image style={styles.img} source={require('../../assets/splash.png')}/>
    </View>
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
