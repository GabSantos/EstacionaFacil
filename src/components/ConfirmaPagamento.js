import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const CarregaCarros = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const vaga = props.route.params.Vaga

  const url = 'http://192.168.15.11:8080/api/vagaOcupada/ConfirmarPagamento/' + vaga.id

  fetch(url, {
    method: 'POST',
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
      props.navigation.navigate('CarregaVagas', {
        Usuario: usuario,
        Token: token
      })
    })
    .catch((error) => {
      console.error(error)
    })

  return <Text>Carregano</Text>
}

export default CarregaCarros