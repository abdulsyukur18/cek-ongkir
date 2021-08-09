import React, { useState, useEffect } from 'react'
import { endPoint, headers } from '../config/key'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Surface, Title, TextInput, HelperText } from 'react-native-paper'
import theme from '../config/theme'
import DropDown from 'react-native-paper-dropdown'


export default function HomeScreen() {

  const navigation = useNavigation()

  const [issubmit, setSubmit] = useState(false)
  const [error, setError] = useState({})

  //open dropdown
  const [showProvOri, setShowProvOri] = useState(false)
  const [showCityOri, setShowCityOri] = useState(false)
  const [showProvDes, setShowProvDes] = useState(false)
  const [showCityDes, setShowCityDes] = useState(false)
  const [showCourir, setShowCourir] = useState(false)

  const [province, setProvince] = useState([])
  const [cityAsal, setCityAsal] = useState([])
  const [cityTujuan, setCityTujuan] = useState([])

  const [provDes, setProvDes] = useState({})
  const [provOri, setProvOri] = useState()
  const listProv = province.map(prov => {
    return {
      value: prov,
      label: prov.province,
      key: prov.province_id
    }
  })

  const [cityOri, setCityOri] = useState({})
  const listCityOri = cityAsal.map(kota => {
    return {
      value: kota,
      label: kota.city_name,
      key: kota.city_id
    }
  })

  const [cityDes, setCityDes] = useState({})
  const listCityDes = cityTujuan.map(kota => {
    return {
      value: kota,
      label: kota.city_name,
      key: kota.city_id
    }
  })

  const [courir, setCourir] = useState({})
  const courirList = [
    { label: 'Jne', value: 'jne' },
    { label: 'Tiki', value: 'tiki' },
    { label: 'Pos Indonesia', value: 'pos' }
  ]

  const [weight, setWeigh] = useState()
  const changeWeight = text => {
    setWeigh(text)
  }

  useEffect(() => {
    const getAllProvince = async () => {
      try {
        const res = await fetch(endPoint + 'province', {
          method: 'GET',
          headers: { 'key': headers }
        })
        const resdata = await res.json()
        const data = await resdata.rajaongkir.results
        setProvince(data)
      } catch (error) {
        console.error({ message: error.message })
      }
    }
    getAllProvince()
  }, [])

  useEffect(() => {
    const getCityOriByProviId = async () => {
      try {
        const res = await fetch(endPoint + 'city?province=' + provOri.province_id, {
          method: 'GET',
          headers: { 'key': headers }
        })
        const resdata = await res.json()
        const data = await resdata.rajaongkir.results
        setCityAsal(data)
      } catch (error) {
      }
    }
    getCityOriByProviId()
  }, [provOri])

  useEffect(() => {
    const getCityDesByProviId = async () => {
      try {
        const res = await fetch(endPoint + 'city?province=' + provDes.province_id, {
          method: 'GET',
          headers: { 'key': headers }
        })
        const resdata = await res.json()
        const data = await resdata.rajaongkir.results
        setCityTujuan(data)
      } catch (error) {
      }
    }
    getCityDesByProviId()
  }, [provDes])

  const send = () => {
    let data = {}
    navigation.navigate('Result')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/cek.png')} />
      <Surface style={styles.surface}>

        <Title style={styles.title}>Original Address</Title>

        <DropDown
          label={'Origin Province'}
          mode={'outlined'}
          visible={showProvOri}
          showDropDown={() => setShowProvOri(true)}
          onDismiss={() => setShowProvOri(false)}
          value={provOri}
          setValue={setProvOri}
          list={listProv}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />

        <DropDown
          label={'Origin city'}
          mode={'outlined'}
          visible={showCityOri}
          showDropDown={() => setShowCityOri(true)}
          onDismiss={() => setShowCityOri(false)}
          value={cityOri}
          setValue={setCityOri}
          list={listCityOri}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />

        <Title style={styles.title}>Destination Address</Title>

        <DropDown
          label={'Destination Province'}
          mode={'outlined'}
          visible={showProvDes}
          showDropDown={() => setShowProvDes(true)}
          onDismiss={() => setShowProvDes(false)}
          value={provDes}
          setValue={setProvDes}
          list={listProv}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />
        <DropDown
          label={'Destination City'}
          mode={'outlined'}
          visible={showCityDes}
          showDropDown={() => setShowCityDes(true)}
          onDismiss={() => setShowCityDes(false)}
          value={cityDes}
          setValue={setCityDes}
          list={listCityDes}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />

        <DropDown
          label={'Courir'}
          mode={'flat'}
          visible={showCourir}
          showDropDown={() => setShowCourir(true)}
          onDismiss={() => setShowCourir(false)}
          value={courir}
          setValue={setCourir}
          list={courirList}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />
        <TextInput
          dense
          label="Weight"
          placeholder="Enter Value"
          value={weight}
          onChangeText={changeWeight}
          error={error.weight ? true : false}

          right={<TextInput.Icon name="weight-gram" />}
        />
        <HelperText
          type='error'
          visible={error.weight ? true : false}>
          {error.weight}
        </HelperText>
        <Button
          style={styles.button}
          mode='contained'
          onPress={send}
        >check</Button>
      </Surface>
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
    marginTop: 5
  },
  surface: {
    width: '95%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eaeaea'
  },
  title: {
    fontSize: 14
  },
  button: {
    marginTop: 30
  },
})