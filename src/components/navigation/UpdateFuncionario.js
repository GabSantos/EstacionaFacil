import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

 
const UpdateFuncionario = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const nome = props.route.params.Nome
  const email = props.route.params.Email
  const telefone = props.route.params.Telefone
  const senha = props.route.params.Senha
  const funcionario = props.route.params.Funcionario

  if(funcionario != null) {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/usuario/funcionario', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          'id': funcionario.id,
          'nome': nome,
          'email': email,
          'senha': senha,
          'telefone': telefone
        }),
      })
        .then((response) => {
          if(response.status == 403){
            Alert.alert('Você não tem permissão para realizar essa ação')
            props.navigation.navigate('MainFuncionario', { Usuario: usuario, Token: token })
          }
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
            props.navigation.navigate('MainFuncionario', { Usuario: usuario, Token: token})
          }
        })
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);
  } else {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/usuario/funcionario', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
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
            Alert.alert('Cadastro realizado com sucesso');
            props.navigation.navigate('MainFuncionario', { Usuario: usuario, Token: token })
          }
        })
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);
  }

  return <Text>Carregando</Text>
}

export default UpdateFuncionario