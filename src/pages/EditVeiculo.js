import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundoinfocliente.png'
import estaciona from '../../assets/icons/estaciona.png'
import ion_car from '../../assets/icons/ion_car.png'
import flechadireita from '../../assets/icons/flechadireita.png'

const fetchFonts = () => {
    return loadAsync({
      'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
      'Modak': require('../../assets/fonts/Modak-Regular.ttf')
    })
  }
  export default function InfoCliente(props) {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
  
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
                  props.navigation.goBack()
                }
              }
            >
              <ImageBackground source={estaciona} style={styles.user} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={
                () => {
                }
              }
            >
             <ImageBackground source={ion_car} style={styles.bgCar} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={
                () => {
                }
              }
            >
             <ImageBackground source={flechadireita} style={styles.bgf} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
        marginTop:150,
      },
      bgf:{
        height: 50,
        width: 50,
        left:155,
        marginTop:-150,
      }
  })
