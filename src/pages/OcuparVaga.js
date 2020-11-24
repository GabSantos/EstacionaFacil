import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ImageBackground, Modal, FlatList } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

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
  const [vaga, setVaga] = useState('')
  const [modal, setModal] = useState(false)

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carros = props.route.params.Carros

  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  const renderItem = ({ item }) => {
    const objCarro = {
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
          onPress={() => {
            setModal(false)
            props.navigation.navigate('CarregaVaga', {
              Carro: objCarro,
              Usuario: usuario,
              Token: token,
              Carros: carros,
              CodVaga: vaga
            })
          }}
        > 
          <ImageBackground source={carro} style={styles.bgCar}>
            <Text style={styles.placa}>{item.placa}</Text>
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
              props.navigation.navigate('InfoCliente', { Usuario: usuario, Token: token, Carros: carros })
            }}
          >
            <ImageBackground source={user} style={styles.user} />
          </TouchableOpacity>
        </View>
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
        <View style={styles.vaga}>
          <ImageBackground source={vagaBg} style={styles.bg}>
            <View style={styles.inputVaga}>
              <TextInput
                placeholder='X00'
                maxLength={3}
                placeholderTextColor='#fbfbfb'
                onChangeText={text => setVaga(text)}
                style={styles.inputTextVaga}
              />
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            setModal(true)
          }}
        >
          <Text style={styles.botaoText}>
            Estacionar
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