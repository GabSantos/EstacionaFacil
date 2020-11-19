import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundoinfocliente.png'
import estaciona from '../../assets/icons/estaciona.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function EditInfo(props) {
  const dados = props.route.params.Dados
  const token = props.route.params.Token

  const [dataLoaded, setDataLoaded] = useState(false)
  const [nome, setNome] = useState(dados.nome)
  const [email, setEmail] = useState(dados.email)
  const [telefone, setTelefone] = useState(dados.telefone)
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
    // Inicio View Geral container
    <View style={styles.container}>
      {/* Inicio View principal */}
      <ImageBackground source={background} style={styles.bg}>
        {/* Inicio da Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={
              () => {
                props.navigation.goBack()
              }
            }
          >
            <ImageBackground source={estaciona} style={styles.user} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          {dados.nome}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.inputs}>
            <TextInput
              placeholder='nome'
              value={nome}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setNome(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='email'
              value={email}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setEmail(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='telefone'
              value={telefone}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setTelefone(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='senha'
              value={senha}
              placeholderTextColor='#fbfbfb'
              secureTextEntry={true}
              onChangeText={text => setSenha(text)}
              style={styles.inputText}
            />
          </View>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate('UpdateUser', { Dados: dados, Token: token, Email: email, Nome: nome, Telefone: telefone, Senha: senha})
            }
            }
          >
            <Text style={styles.botaoText}>
              Salvar
            </Text>
          </TouchableOpacity>
          {/* Fim do Botao */}
        </View>





      </ImageBackground>
      {/* Fim view principal */}
    </View>
    // Fim View Geral container
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
    marginTop: 60,
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
    height: 34,
    width: 220,
    borderColor: '#fcf400',
    borderBottomWidth: 3,
    justifyContent: 'center',
    margin: 10
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
    marginTop: 30,
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
    color: '#fbfbfb',
  },
  inputVaga: {
    height: 100,
    width: 190,
    borderColor: '#FFD600',
    borderBottomWidth: 10,
    justifyContent: 'center',
    margin: 20
  },
  user: {
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 60,
    padding: 0,
    margin: 0,
    backgroundColor: '#0085FF',
    borderBottomWidth: 4,
    borderBottomColor: '#52ACFF',
    justifyContent: 'center'
  },
  botoesHeader: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 15,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 50,
    height: 370,
    width: 300,
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'linear-gradient(90deg, rgba(0, 133, 255, 1) 100%, rgba(82,172,255,1) 100%)'
  },
  text: {
    position: 'absolute',
    top: 120,
    height: 'auto',
    width: '90%',
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  }
})

