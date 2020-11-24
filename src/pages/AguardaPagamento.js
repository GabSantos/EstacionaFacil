import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ImageBackground, Modal, FlatList } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import user from '../../assets/icons/user.png'

import vagaBg from '../../assets/vaga.png'
import background from '../../assets/fundotelainicial.png'
import carrobg from '../../assets/carro.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function AguardaPagamento(props) {
  const [dataLoaded, setDataLoaded] = useState(false)

  const carro = props.route.params.Carro
  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const vaga = props.route.params.Vaga

  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('InfoCliente', { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={user} style={styles.user} />
          </TouchableOpacity>
        </View>

        <View style={styles.vaga}>
          <Text style={styles.valor}>{'R$' + vaga.valor}</Text>
          <Text style={styles.text}>Dirija-se ao caixa para realizar o pagamento</Text>
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            props.navigation.navigate('CheckPagamento', {
              Usuario: usuario,
              Token: token,
              Vaga: vaga,
              Carro: carro
            })
          }}
        >
          <Text style={styles.botaoText}>
            Pago!
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
    backgroundColor: 'linear-gradient(90deg, rgba(255, 514, 0, 1) 100%, rgba(250,255,0,1) 100%)',
    marginTop: 60,
    height: 360,
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
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
  valor: {
    color: '#0085FF',
    fontSize: 35,
    alignItems: 'center',
    margin: 20
  },
  text: {
    color: '#0085FF',
    fontSize: 35,
    textAlign: 'center',
    margin: 20
  }
})