import React, { useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
import background from '../../assets/fundotelainicial.png'


// Função carrega fontes externas
const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}
export default function App(props) {
  // Carrega fontes externas
  const [dataLoaded, setDataLoaded] = useState(false)
  if (!dataLoaded)
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />

  return (

    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.topv}>
          <Text style={styles.estaciona}>
            ESTACIONA
          </Text>
          <Text style={styles.facil}>
            FÁCIL
          </Text>
        </View>
        <View style={styles.botv}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate('Login')
            }}
          >
            <Text style={styles.botaoText}>
              Entrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              props.navigation.navigate('Cadastro')
            }}
          >
            <Text style={styles.botaoText}>
              Cadastrar
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
  topv: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botv: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
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
  botao: {
    backgroundColor: 'linear-gradient(90deg, rgba(255, 514, 0, 1) 100%, rgba(250,255,0,1) 100%)',
    height: 38,
    borderRadius: 40,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: 280
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 30,
    color: '#0085FF',
    marginTop: 5
  }

})