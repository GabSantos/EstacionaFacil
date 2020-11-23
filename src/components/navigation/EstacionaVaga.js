import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const EstacionaVaga = (props) => {

  const carro = props.route.params.Carro
  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const vaga = props.route.params.Vaga

  //#region Fetch Get vaga
  fetch('http://192.168.15.11:8080/api/vagaOcupada', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      'vaga': vaga,
      'veiculo': carro.id
    })
  })
    .then((response) => {
      console.log(response.status)
      return response.json()
    })
    .then((json) => {
      if (json.dados === null) {
        json.erros.forEach(erro => {
          Alert.alert(erro)
        })
        props.navigation.goBack()
      } else {
        props.navigation.navigate('DesocuparVaga', {
          Usuario: usuario,
          Token: token,
          Vaga: json.dados,
          Carro: carro
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })
  //#endregion



  return <Text>0</Text>
}

export default EstacionaVaga