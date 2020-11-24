import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications


const UpdateCarro = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carro = props.route.params.Carro
  const marca = props.route.params.Marca
  const cor = props.route.params.Cor
  const placa = props.route.params.Placa
  const tipo = props.route.params.Tipo

  if (carro != null) {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/veiculo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          'id': carro.id,
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
            props.navigation.navigate('CarregaCarros', { Dados: usuario, Token: token })
          }
        }
        )
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);
  } else {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/veiculo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
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
            Alert.alert('Cadastro realizado com sucesso');
            props.navigation.navigate('CarregaCarros', { Dados: usuario, Token: token })
          }
        }
        )
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);
  }

  return <Text>0</Text>
}

export default UpdateCarro