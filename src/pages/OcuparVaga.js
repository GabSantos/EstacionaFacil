import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
import { Icon, InlineIcon } from '@iconify/react'
import bxsUser from '@iconify/icons-bx/bxs-user'

import vagaBg from '../../assets/vaga.png'
import background from '../../assets/fundotelainicial.png'
import Header from '../components/Header'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function Login(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [vaga, setVaga] = useState('')

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <Header>
          <TouchableOpacity style={{color: '#ffd600', fontSize: '40px'}}>
            <Icon icon={bxsUser} />
          </TouchableOpacity>
        </Header>
        <View style={styles.vaga}>
          <ImageBackground source={vagaBg} style={styles.bg}>
            <View style={styles.inputVaga}>
              <TextInput
                placeholder='0000'
                maxLength={4}
                placeholderTextColor='#fbfbfb'
                onChange={text => setVaga(text)}
                style={styles.inputTextVaga}
              />
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity
            style={styles.botao}
            onPress={
              () => {
              }
            }
          >
            <Text style={styles.botaoText}>
              Estacionar
            </Text>
          </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  bg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vaga: {
    marginTop: 120,
    height: 360,
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  estaciona: {
    fontFamily: 'Stardos',
    fontSize: 60,
    color: '#FBFBFB'
  },
  facil: {
    fontFamily: 'Stardos',
    fontSize: 60,
    marginLeft: 150,
    color: '#FBFBFB'
  },
  inputs: {
    height: 54,
    width: 280,
    borderColor: '#FBFBFB',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    margin: 20
  },
  inputText: {
    height: 54,
    width: 244,
    marginLeft: 18,
    fontSize: 20,
  },
  botao: {
    backgroundColor: 'linear-gradient(90deg, rgba(255, 514, 0, 1) 100%, rgba(250,255,0,1) 100%)',
    width: 240,
    height: 50,
    borderRadius: 40,
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 25,
    color: '#0085FF',
    marginTop: 5
  },
  inputTextVaga: {
    height: '100%',
    width: '100%',
    fontSize: 70,
    textAlign: 'center',
    fontFamily: 'Stardos',
  },
  inputVaga: {
    height: 100,
    width: 190,
    borderColor: '#FFD600',
    borderBottomWidth: 10,
    justifyContent: 'center',
    margin: 20
  },
})

