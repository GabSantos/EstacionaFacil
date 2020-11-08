import React, { useState, Component } from 'react'
import {Text, View, TextInput, Alert, Button,StyleSheet,ImageBackground} from 'react-native'

import background from '../img/fundotelainicial.png'
export default function App() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.bgti}>
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
    bgti: {
      width: '100%',
      height: '100%'
    }
  })

