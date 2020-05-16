import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {THEME} from '../theme'

export const TodoScreen = ({goBack, todo}) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title='Back' color={THEME.GREY_COLOR} onPress={goBack}/>
        </View>
        <View style={styles.button}>
          <Button title='Remove' color={THEME.DANGER_COLOR} onPress={() => console.log('Remove')}/>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '49%'
  }
})
