import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const UpdateUser = (props) => {

  const dados = props.route.params.Dados
  const token = props.route.params.Token
  const nome = props.route.params.Nome
  const email = props.route.params.Email
  const telefone = props.route.params.Telefone
  const senha = props.route.params.Senha

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/usuario/cliente', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': dados.id,
        'nome': nome,
        'email': email,
        'senha': senha,
        'telefone': telefone
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
          props.navigation.navigate('InfoCliente', { Dados: json.dados, Token: token})
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