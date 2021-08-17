import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import theme from '../config/theme'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { endPoint, headers } from '../config/key'
import NumberFormat from 'react-number-format'

export default function ResultScreen({ route, navigation }) {

  const { props } = route.params
  const [cost, setCost] = useState([])

  const kurir = {
    jne: require('../assets/jne.png'),
    tiki: require('../assets/tiki.png'),
    pos: require('../assets/pos.png')
  }



  useEffect(() => {
    const getResult = async () => {

      const data = new URLSearchParams()
      data.append('origin', props.origin)
      data.append('destination', props.destination)
      data.append('weight', props.weight)
      data.append('courier', props.courir)
      try {
        const res = await fetch(endPoint + 'cost', {
          method: 'POST',
          headers: { 'key': headers, 'content-type': 'application/x-www-form-urlencoded' },
          body: data.toString(),
        })
        const resdata = await res.json()
        const cost = await resdata.rajaongkir.results[0].costs
        setCost(cost)
      } catch (error) {
        console.log(error)
      }
    }
    getResult()
  }, [])


  return (
    <View style={styles.container}>
      <Card style={styles.card}>

        {cost && cost.map((h, i) => {
          return <Card.Title
            key={i}
            title={h.service}
            subtitle={h.cost[0].etd}
            left={() => <Avatar.Image source={kurir[props.courir]} size={40} />}
            right={() => <NumberFormat
              value={h.cost[0].value}
              displayType={'text'}
              prefix={'Rp '}
              thousandSeparator={true}
              renderText={value => <Text style={styles.harga}>{value}</Text>}
            />}
          />
        })}
      </Card>
      <Button
        style={styles.button}
        mode='contained'
        onPress={() => {
          navigation.navigate('Home')
        }}
      >HOME</Button>
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

  button: {
    position: 'absolute',
    bottom: 30,
    margin: 'auto',
    backgroundColor: '#eaeaea'
  },
  card: {
    width: '94%',
    marginBottom: 5,
    display: 'flex',
  },
  harga: {
    marginRight: 15,
    color: 'red',
  },

})

