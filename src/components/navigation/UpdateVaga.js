import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const UpdateFuncionario = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const codigo = props.route.params.Codigo
  const vaga = props.route.params.Vaga

  if (vaga != null) {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/vaga', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          'id': vaga.id,
          'codVaga': codigo,
          'disponivel': true
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
            props.navigation.navigate('MainFuncionario', { Dados: dados, Token: token })
          }
        }
        )
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);
  } else {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/vaga', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          'codVaga': codigo,
          'disponivel': true
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
            props.navigation.goBack()
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

export default UpdateFuncionario