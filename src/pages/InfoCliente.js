import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
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

export default function InfoCliente(props) {
  const [dataLoaded, setDataLoaded] = useState(false)

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
        <Text style={styles.nome}>
          {usuario.nome}
        </Text>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate("Veiculos", { Usuario: usuario, Token: token, Carros: carros })
            }}
          >
            <Text style={styles.botaoText}>
              Veículos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate("EditInfo", { Usuario: usuario, Token: token, Carros: carros })
            }}
          >
            <Text style={styles.botaoText}>
              Editar Conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate("Inicial")
            }}
          >
            <Text style={styles.botaoText}>
              Sair
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
  botao: {
    backgroundColor: 'linear-gradient(90deg, rgba(0, 133, 255, 1) 100%, rgba(82,172,255,1) 100%)',
    width: '100%',
    height: 54,
    borderRadius: 40,
    marginTop: 22,
    marginBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 30,
    color: '#fbfbfb',
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
    bottom: 60,
    height: 350,
    width: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
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
  }
})