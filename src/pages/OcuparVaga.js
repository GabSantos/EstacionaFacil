  
import React, { useState, useEffect } from 'react'
import { Text, Alert, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import vagaBg from '../../assets/vaga.png'
import background from '../../assets/fundotelainicial.png'
import user from '../../assets/icons/user.png'

import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem('@'+key, value)
  } catch (e) {
    // saving error
  }
}

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem('@' + key)
    if(value !== null) {
      return value
    }
  } catch(e) {
    // error reading value
  }
}

const setModalVisible = (visible) => {
  this.setState({ modalVisible: visible });
}

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}


export default function OcuparVaga(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [vaga, setVaga] = useState("")
  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)

  const email = props.route.params.emailCliente
  const nome = props.route.params.nomeCliente
  const senha = props.route.params.senhaCliente
  const telefone = props.route.params.telefoneCliente

  const login = 'http://192.168.15.11:8080/auth'
  const cadastro = 'http://192.168.15.11:8080/api/usuario'

  if (props.route.params.login) {
    useEffect(() => {
      fetch(login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'senha': senha
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 400) {
              Alert.alert("Email e/ou senha incorreto(s)");
              props.navigation.goBack()
            }
          }
          return response.json()
        })
        .then((json) => {
          setData(json.dados)
        }
        )
        .catch((error) => {
          console.error(error)
        })
    }, []);
  } else {
    useEffect(() => {
      fetch(cadastro, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'senha': senha,
          'nome': nome,
          'telefone': telefone,
          'tipo': 'C',
          'ativo': true
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 400) {
              Alert.alert("Ocorreu um erro");
              props.navigation.goBack()
            }
          }
          return response.json()
        })
        .then((json) => {
          setData(json.dados)
        }
        )
        .catch((error) => {
          console.error(error)
        })
    }, []);
  }


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
                props.navigation.navigate("InfoCliente")
              }
            }
          >
            <ImageBackground source={user} style={styles.user} />
          </TouchableOpacity>
        </View>
        {/* Fim da Header Inicio da Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            //props.navigation.navigate("")
          }}
        >

        </Modal>
        {/* Fim da Modal inicio da Vaga */}
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
        {/* Fim da Vaga inicio do Botao */}
        <TouchableOpacity
          style={styles.botao}
          onPress={
            () => {
              setModalVisible(true)
            }
          }
        >
          <Text style={styles.botaoText}>
            Estacionar
            </Text>
        </TouchableOpacity>
        {/* Fim do Botao */}
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
    justifyContent: 'center',
  },
  botoesHeader: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 15,
  },
})