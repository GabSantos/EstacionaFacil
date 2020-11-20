import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const UpdateUser = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carroId = props.route.params.CarroId
  const marca = props.route.params.Marca
  const cor = props.route.params.Cor
  const placa = props.route.params.Placa
  const tipo = props.route.params.Tipo

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/veiculo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        'id': carroId,
        'marca': marca,
        'cor': cor,
        'placa': placa,
        'tipo': tipo,
        'usuarioId': usuario.id
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.dados === null) {
          json.erros.forEach(erro => {
            Alert.alert(erro)
          })
          props.navigation.goBack()
        } else {
          Alert.alert('Alteração realizada com sucesso');
          props.navigation.navigate('InfoCliente', { Dados: usuario, Token: token})
        }
      }
      )
      .catch((error) => {
        console.error(error)
      }).then(() => { })
  }, []);

  return <Text>0</Text>
}

export default UpdateUser