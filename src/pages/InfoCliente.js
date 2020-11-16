import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundotelainicial.png'
import voltar from '../../assets/icons/voltar.png'
import estaciona from '../../assets/icons/estaciona.png'
import users from '../../assets/icons/users.png'
import carro from '../../assets/icons/carro.png'
import redondo from '../../assets/icons/redondo.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function Cadastro(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [senha, setSenha] = useState('')

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
      <View style={styles.header}>
          <TouchableOpacity 
            style={styles.botoesHeader}
            onPress={
              () => {

              }
            }  
          >
              <ImageBackground source={estaciona} style={styles.estaciona} />
             
          </TouchableOpacity>
         
        </View>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.botv}>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Nome'
              placeholderTextColor='#fbfbfb'
              value={nome}
              onChange={text => setNome(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='E-mail'
              placeholderTextColor='#fbfbfb'
              autoCompleteType='email'
              value={email}
              onChange={text => setEmail(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='senha'
              placeholderTextColor='#fbfbfb'
              keyboardType='numeric'
              value={senha}
              onChange={text => setSenha(text)}
              style={styles.inputText}
            />
          </View>
          <TouchableOpacity
            style={styles.botao}
            onPress={
              () => {
              }
            }
          >
            <Text style={styles.botaoText}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
  },
  bg: {
    width: '100%',
    height: '100%'
  },
  topv: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botv: {
    flex: 1.2,
    width: '100%',
    padding: 0,
    margin: 0,
    marginTop: 50,
    alignItems: 'center',
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
    margin: 10,
  },
  inputText: {
    height: 54,
    width: 244,
    marginLeft: 18,
    fontSize: 20,
    fontFamily: "Modak"
  },
  botao: {
    backgroundColor: 'linear-gradient(90deg, rgba(255, 514, 0, 1) 100%, rgba(250,255,0,1) 100%)',
    width: 192,
    height: 38,
    borderRadius: 40,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voltar: {
    height: '100%',
    width: '100%',
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 20,
    color: '#0085FF',
    marginTop: 5
  },
  botoesHeader: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 15,
  },
  estaciona: {
    height: '100%',
    width: '100%',
  },
  users: {
    height: '100%',
    width: '100%',
  },
  carro: {
    height: '100%',
    width: '100%',
  },
  header: {
   flexDirection:"row",
   backgroundColor: 'linear-gradient(90deg, rgba(0, 133, 255, 1) 100%, rgba(250,255,0,1) 100%)',
  },

})

