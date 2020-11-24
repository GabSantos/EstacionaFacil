import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications


const CarregaCarros = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token

  const url = 'http://192.168.15.11:8080/api/vaga/todas'

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      props.navigation.navigate('CarregaVagasOcupadas', {
        Usuario: usuario,
        Token: token,
        Vagas: json.dados
      })
    })
    .catch((error) => {
      console.error(error)
    })

  return <Text>Carregano</Text>
}

export default CarregaCarros