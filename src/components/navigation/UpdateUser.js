import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications


const UpdateUser = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const nome = props.route.params.Nome
  const email = props.route.params.Email
  const telefone = props.route.params.Telefone
  const senha = props.route.params.Senha
  const carros = props.route.params.Carros

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/usuario/cliente', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': usuario.id,
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
          props.navigation.navigate('InfoCliente', { Usuario: json.dados, Token: token, Carros: carros })
        }
      })
      .catch((error) => {
        console.error(error)
      }).then(() => { })
  }, []);

  return <Text>Carregando</Text>
}

export default UpdateUser