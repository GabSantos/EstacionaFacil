
import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ImageBackground, Modal, FlatList } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import user from '../../assets/icons/user.png'

import vagaBg from '../../assets/vaga.png'
import background from '../../assets/fundotelainicial.png'
import carro from '../../assets/carro.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}
  

export default function OcuparVaga(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [vaga, setVaga] = useState("")
  const [modal, setModal] = useState(false)
  const [dados, setDados] = useState({})
  const [carros, setCarros] = useState([])

  const token = props.route.params.Token
  const email = props.route.params.Email

  //#region Fetch Get User info by email
  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/usuario/' + email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.dados.tipo !== "C") {
          props.navigation.navigate("MainFuncionario", { Dados: json.dados, Token: token })
        }
        setDados(json.dados)
        console.log(dados)
      }
      )
      .catch((error) => {
        console.error(error)
      })
  }, []);
  //#endregion

  //#region Fetch Get Veiculos by user ID
  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/veiculo/cliente/' + dados.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setCarros(json.dados)
        console.log(carros)
      }
      )
      .catch((error) => {
        console.error(error)
      })
  }, []);
  //#endregion

  //#region Carrega fontes externas
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }
  //#endregion

  const renderItem = ({ item }) => {

    if (carros == null) {
      return (
        <View>
          <TouchableOpacity
            onPress={
              () => {
                setModal(false) 
                props.navigation.navigate('Veiculos', { Dados: dados, Token: token })
              }
            }
          >
            <ImageBackground source={carro} style={styles.bgCar}>
              <Text style={styles.placa}>Você não possui nenhum veículo cadastrado</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )
    }

    const dadosCarro = {
      "id": item.id,
      "marca": item.marca,
      "cor": item.cor,
      "placa": item.placa,
      "tipo": item.tipo,
      "usuarioId": item.usuarioId
    }
    return (
      <View>
        <TouchableOpacity
          onPress={
            () => {
              setModal(false)
              props.navigation.navigate('DesocuparVaga', { Carro: dadosCarro, Usuario: dados, Token: token })
            }
          }
        >
          <ImageBackground source={carro} style={styles.bgCar}>
            <Text style={styles.placa}>{item.placa}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

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
                props.navigation.navigate("InfoCliente", { Dados: dados, Token: token })
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
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => { setModal(false) }}
          > 
              <TouchableWithoutFeedback>
                <View style={styles.modal}>
                  <SafeAreaView style={styles.carList}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={carros}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      style={styles.flatList}
                    />


                  </SafeAreaView>
                </View>
              </TouchableWithoutFeedback>
          </TouchableOpacity>
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
              setModal(true)
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
  carList: {
    marginTop: 90,
    height: 238,
    width: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatList: {
    height: 600,
    width: 'auto',
  },
  nome: {
    position: 'absolute',
    top: 120,
    height: 'auto',
    width: '90%',
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  },
  placa: {
    marginTop: 30,
    height: 45,
    width: 190,
    fontSize: 38,
    color: '#ffd600',
    textAlign: 'center'
  },
  modal: {
    height: 350,
    width: 350,
    backgroundColor: '#FDEA00',
    borderRadius: 40,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: '#0085FF',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  bgCar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
    width: 260,
    marginTop: 150,
  },
})