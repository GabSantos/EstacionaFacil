
import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundotelainicial.png'

import user from '../../assets/icons/user.png'
import users from '../../assets/icons/users.png'
import carro from '../../assets/icons/carro.png'
import voltar from '../../assets/icons/voltar.png'
import esquerda from '../../assets/esquerda.png'
import direita from '../../assets/direita.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}


export default function Vagas(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [vagas, setVagas] = useState([])

  // const email = props.route.params.emailCliente
  // const nome = props.route.params.nomeCliente
  // const senha = props.route.params.senhaCliente
  // const telefone = props.route.params.telefoneCliente

  // const login = 'http://192.168.15.11:8080/auth'
  // const cadastro = 'http://192.168.15.11:8080/api/usuario'

  // if (props.route.params.login) {
  //   useEffect(() => {
  //     fetch(login, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'email': email,
  //         'senha': senha
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           if (response.status == 400) {
  //             Alert.alert("Email e/ou senha incorreto(s)");
  //             props.navigation.goBack()
  //           }
  //         }
  //         return response.json()
  //       })
  //       .then((json) => {
  //         setData(json.dados)
  //       }
  //       )
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }, []);
  // } else {
  //   useEffect(() => {
  //     fetch(cadastro, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'email': email,
  //         'senha': senha,
  //         'nome': nome,
  //         'telefone': telefone,
  //         'tipo': 'C',
  //         'ativo': true
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           if (response.status == 400) {
  //             Alert.alert("Ocorreu um erro");
  //             props.navigation.goBack()
  //           }
  //         }
  //         return response.json()
  //       })
  //       .then((json) => {
  //         setData(json.dados)
  //       }
  //       )
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }, []);
  // }


  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

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
    const array = [
      { vaga: 'A2', status: 'Ocupado', entrada: '12:30', valor: '0' },
      { vaga: 'A7', status: 'Ocupado', entrada: '11:22', valor: '0' },
      { vaga: 'A11', status: 'Aguardando pagamento', entrada: '11:00', valor: '21,50' }
    ]

    const status = (object) => {
      if (object.vaga == 'Ocupado') {
        return <Text>{object.entrada}</Text>
      } else {
        return <Text>{object.valor}</Text>
      }
    }

    return (
      array.map(object => {
        <View style={lado()}>
          <Text>
            {object.vaga}
          </Text>
          <Text>
            {object.vaga}
          </Text>
          {status(object)}
        </View>
      })

    )

  }

  return (
    // Inicio View Geral container
    <View style={styles.container}>
      {/* Inicio View principal */}
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
              props.navigation.navigate("CadastroFuncionario", { Dados: dados, Token: token })
            }}
          >
            <ImageBackground source={user} style={styles.icon} />
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
              props.navigation.navigate("CadastroVaga", { Dados: dados, Token: token }) // Cadastrar nova vaga
            }}
          >
            <ImageBackground source={carro} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {/* Fim da Modal inicio da Vaga */}
        <SafeAreaView style={styles.funcList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={vagas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />


        </SafeAreaView>
        {/* Fim da Vaga inicio do Botao */}
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
    height: '100%',
    width: '100%',
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
    marginTop: 60,
    width: '100%',
    height: 'auto'
  },
  funcList: {
    width: '100%',
    height: 'auto'
  },
})