import React from 'react'
import {View, StyleSheet} from 'react-native'

// export const AppCard = ({title}) => {
export const AppCard = (props) => (
  <View style={{...styles.default, ...props.style}}>
    {props.children}
  </View>
)


const styles = StyleSheet.create({
  default: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5
  }
})
