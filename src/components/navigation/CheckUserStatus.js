import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const CheckUserStatus = (props) => {

  const email = props.route.params.Email
  const token = props.route.params.Token

  const url = 'http://192.168.15.11:8080/api/usuario/' + email

  useEffect(() => {
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
        if (json.dados.tipo != 'C') {
          props.navigation.navigate('MainFuncionario', { Usuario: json.dados, Token: token })
        } else {
          props.navigation.navigate('CarregaCarros', { Usuario: json.dados, Token: token })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  return <Text>Carregando</Text>
}

export default CheckUserStatus