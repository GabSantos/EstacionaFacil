import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundotelainicial.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function Login(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

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
        <View style={styles.topv}>
          <TouchableOpacity
            onPress={
              () => {
                props.navigation.goBack()
              }
            }
          >
            <Text style={styles.estaciona}>
              ESTACIONA
                      </Text>
            <Text style={styles.facil}>
              FÁCIL
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.botv}>
          <View style={styles.inputs}>
            <TextInput
              placeholder='E-mail'
              value={email}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setEmail(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Senha'
              value={senha}
              placeholderTextColor='#fbfbfb'
              secureTextEntry={true}
              onChangeText={text => setSenha(text)}
              style={styles.inputText}
              passwordRules={true}
            />
          </View>
          <TouchableOpacity
            style={styles.botao}
            onPress={
              () => {
                props.navigation.navigate("LoadingLogin", {emailCliente: email, senhaCliente: senha, login: true})
              }
            }
          >
            <Text style={styles.botaoText}>
              Entrar
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
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
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
    width: 192,
    height: 38,
    borderRadius: 40,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 30,
    color: '#0085FF',
    marginTop: 5
  }

})

