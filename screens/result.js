import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import theme from '../config/theme'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'

export default function ResultScreen() {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/cek.png')} />
      <Button
        style={styles.button}
        mode='contained'
        onPress={() => {
          navigation.navigate('Home')
        }}
      >ok</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary
  },
  logo: {
    alignItems: 'flex-start'
  }
})

