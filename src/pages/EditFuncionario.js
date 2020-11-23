import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundotelainicial.png'
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
  const [nome, setNome] = useState(funcionario.nome)
  const [email, setEmail] = useState(funcionario.email)
  const [telefone, setTelefone] = useState(funcionario.telefone)
  const [senha, setSenha] = useState('')


  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('CadastroFuncionario', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={voltar} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('Vagas')
            }}
          >
            <ImageBackground source={estaciona} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('Funcionarios', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={users} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('CadastroVaga', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={carro} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.botv}>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Nome'
              placeholderTextColor='#fbfbfb'
              value={nome}
              onChangeText={text => setNome(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='E-mail'
              placeholderTextColor='#fbfbfb'
              autoCompleteType='email'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='telefone'
              placeholderTextColor='#fbfbfb'
              keyboardType='numeric'
              value={telefone}
              onChangeText={text => setTelefone(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='senha'
              placeholderTextColor='#fbfbfb'
              secureTextEntry={true}
              passwordRules={true}
              onChangeText={text => setSenha(text)}
              style={styles.inputText}
            />
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate('UpdateFuncionario', {
                Dados: usuario,
                Token: token,
                Nome: nome,
                Email: email,
                Telefone: telefone,
                Senha: senha,
                Funcionario: funcionario
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
    margin: 0
  },
  bg: {
    width: '100%',
    height: '100%'
  },
  botv: {
    flex: 1.2,
    width: '100%',
    padding: 0,
    margin: 0,
    marginTop: 190,
    alignItems: 'center',
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
    color: '#FBFBFB',
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
  }
})
