import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

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
    backgroundColor: '#3949AB',
    paddingBottom: 10
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
})
