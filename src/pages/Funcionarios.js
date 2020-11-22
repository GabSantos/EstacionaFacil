import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, SafeAreaView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundotelainicial.png'

import user from '../../assets/icons/user.png'
import voltar from '../../assets/icons/voltar.png'
import carro from '../../assets/icons/carro.png'
import estaciona from '../../assets/icons/estaciona.png'
import esquerda from '../../assets/esquerda.png'
import direita from '../../assets/direita.png'


const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}


export default function MainFuncionario(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [funcionarios, setFuncionarios] = useState([])

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/usuario/funcionario/todos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setFuncionarios(json.dados)
      }
      )
      .catch((error) => {
        console.error(error)
      })
  }, []);



  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  let cont = 1
  const renderItem = ({ item }) => {
    let bgList
    if (cont % 2 != 0) {
      bgList = esquerda
      cont++
    } else {
      bgList = direita
      cont++
    }

    const objFuncionario = {
      "id": item.id,
      "nome": item.nome,
      "email": item.email,
      "telefone": item.telefone,
      "senha": item.senha,
      "usuarioId": item.usuarioId
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('EditFuncionario', {
              Funcionario: objFuncionario,
              Usuario: usuario,
              Token: token
            })
          }}
        >
          <ImageBackground source={bgList} style={styles.funcionarioContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('MainFuncionario', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={voltar} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('CadastroFuncionario', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={user} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('Vagas', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={estaciona} style={styles.icon} />
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
        <SafeAreaView style={styles.funcList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={funcionarios}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        </SafeAreaView>
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
  funcionarioContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatList: {
    marginTop: 60,
    width: '100%',
    height: 'auto'
  },
  funcList: {
    width: '100%',
    height: 'auto'
  },
  nome: {
    height: '100%',
    width: '100%',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Modak',
    color: '#fbfbfb',
    textAlignVertical: 'center'
  }
})