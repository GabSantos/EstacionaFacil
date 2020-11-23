import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, SafeAreaView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundoinfocliente.png'
import estaciona from '../../assets/icons/estaciona.png'
import ion_car from '../../assets/icons/ion_car.png'
import carro from '../../assets/carro.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function InfoCliente(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [temFim, setTemFim] = useState(false)

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carros = props.route.params.Carros

  const arr = carros == null ? [] : carros

  const fim = {
    "id": "fim",
    "marca": "s",
    "cor": "s",
    "placa": "Add Carro",
    "tipo": "a",
    "usuarioId": "adm"
  }


  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  arr.forEach(element => {
    if (element.id == 'fim') {
      setTemFim(true)
    }
  })
  if(!temFim)
    arr.push(fim)
  const renderItem = ({ item }) => {
    if (item.id === 'fim') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CadastroVeiculo', { Usuario: usuario, Token: token, Carros: carros })
            }}
          >
            <ImageBackground source={ion_car} style={styles.bgCar} />
          </TouchableOpacity>
        </View>
      )
    } else {
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
              props.navigation.navigate('EditVeiculo', { Carro: objCarro, Usuario: usuario, Token: token, Carros: carros })
            }}
          >
            <ImageBackground source={carro} style={styles.bgCar}>
              <Text style={styles.placa}>{item.placa}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate('OcuparVaga', { Usuario: usuario, Token: token, Carros: carros })
            }}
          >
            <ImageBackground source={estaciona} style={styles.user} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>
          {usuario.nome}
        </Text>
        <SafeAreaView style={styles.carList}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={arr}
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
    alignItems: 'center',
    justifyContent: 'center',
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
  bgCar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
    width: 260,
    marginTop: 150,
  },
  carList: {
    marginTop: 90,
    height: 238,
    width: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatList: {
    marginTop: 180,
    height: 600,
    width: 'auto',
    paddingRight: 60,
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
  }
})
