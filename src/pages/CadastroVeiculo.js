import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
import { Picker } from '@react-native-picker/picker'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import background from '../../assets/fundoinfocliente.png'
import estaciona from '../../assets/icons/estaciona.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function EditVeiculo(props) {

  const [dataLoaded, setDataLoaded] = useState(false)
  const [marca, setMarca] = useState('')
  const [cor, setCor] = useState('')
  const [placa, setPlaca] = useState('')
  const [tipo, setTipo] = useState('')

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carros = props.route.params.Carros

  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('CarregaCarros', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={estaciona} style={styles.user} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          {usuario.nome}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Marca'
              value={marca}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setMarca(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='cor'
              value={cor}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setCor(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Placa'
              value={placa}
              placeholderTextColor='#fbfbfb'
              onChangeText={text => setPlaca(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <Picker
              selectedValue={tipo}
              onValueChange={itemValue => { setTipo(itemValue) }}
            >
              <Picker.Item label="Tipo" value="" />
              <Picker.Item label="Carro" value="C" />
              <Picker.Item label="Moto" value="M" />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate('UpdateCarro', {
                Usuario: usuario,
                Token: token,
                Marca: marca,
                Cor: cor,
                Placa: placa,
                Tipo: tipo
              })
            }}
          >
            <Text style={styles.botaoText}>
              Salvar
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
    margin: 0,
  },
  bg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

