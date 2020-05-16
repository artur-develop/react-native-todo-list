import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {THEME} from '../theme'

// export const Navbar = ({title}) => {
export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center', // выравниваем по горизонтали
    justifyContent: 'flex-end', // выравниваем по вертикали
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
})
