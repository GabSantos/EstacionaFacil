import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundotelainicial.png'
import vagaBg from '../../assets/vaga.png'
import voltar from '../../assets/icons/voltar.png'
import estaciona from '../../assets/icons/estaciona.png'
import users from '../../assets/icons/users.png'
import carro from '../../assets/icons/carro.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function Cadastro(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [vaga, setVaga] = useState('')

  const dados = props.route.params.Dados
  const token = props.route.params.Token

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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("MainFuncionario", { Dados: dados, Token: token })
            }}
          >
            <ImageBackground source={voltar} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("Funcionarios", { Dados: dados, Token: token }) // Listar todos funcionarios
            }}
          >
            <ImageBackground source={users} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("Vagas", { Dados: dados, Token: token }) //Listar todas vagas
            }}
          >
            <ImageBackground source={estaciona} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("AddVaga", { Dados: dados, Token: token }) // Cadastrar nova vaga
            }}
          >
            <ImageBackground source={carro} style={styles.icon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.vaga}>
          <ImageBackground source={vagaBg} style={styles.bg}>
            <View style={styles.inputVaga}>
              <TextInput
                placeholder='X00'
                maxLength={3}
                value={vaga}
                placeholderTextColor='#fbfbfb'
                onChangeText={text => setVaga(text)}
                style={styles.inputTextVaga}
              />
            </View>
          </ImageBackground>
        </View>
        {/* Fim da Vaga inicio do Botao */}
        <TouchableOpacity
          style={styles.botao}
          onPress={
            () => {
              props.navigation.navigate('UpdateVaga', { Usuario: dados, Token: token, Codigo: vaga })
            }
          }
        >
          <Text style={styles.botaoText}>
            Salvar
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
  vaga: {
    marginTop: 60,
    height: 360,
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
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
  icon: {
    width: '100%',
    height: '100%'
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  botoesHeader: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginRight: 25,
  },
  direita: {
    height: 60,
    width: '100%',
    backgroundColor: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255,255,0,1) 50%)',
    flexDirection: 'row'
  },
  esquerda: {
    height: 60,
    width: '100%',
    backgroundColor: 'linear-gradient(90deg, rgba(255, 255, 0, 1) 50%, rgba(255,255,255,1) 0%)',
    flexDirection: 'row'
  },
  flatList: {
    marginTop:60,
    width: '100%',
    height: 'auto'
  },
  funcList: {
    width: '100%',
    height: 'auto'
  },
})

