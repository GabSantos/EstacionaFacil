import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications


const CheckVagaOcupada = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carros = props.route.params.Carros

  const url = 'http://192.168.15.11:8080/api/vagaOcupada/VagasOcupadasNaoPagas'

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1AZW1haWwuY29tIiwicm9sZSI6IlJPTEVfRlVOQyIsImNyZWF0ZWQiOjE2MDU4OTI0Nzg4MzAsImV4cCI6MTYwNjQ5NzI3OH0.hr83_tQP963QQRxQpJWVXWhZ-pgIvo3AkO0yVlETsZfBbheaxcccM7FfGWIcytNNNFGa5m0j0I7Vcbp7rSHXaw'//token
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        let ocupado = false
        if (json.dados != null && carros != null) {
          json.dados.forEach(vaga => {
            carros.forEach(carro => {
              if (vaga.veiculo == carro.id) {
                ocupado = true
                props.navigation.navigate('DesocuparVaga', {
                  Usuario: usuario,
                  Token: token,
                  Vaga: vaga,
                  Carro: carro,
                  Carros: carros
                })
              }
            })
          })
        }
        if (!ocupado)
          props.navigation.navigate('OcuparVaga', {
            Usuario: usuario,
            Token: token,
            Carros: carros
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);



  return <Text>Carregando</Text>
}

export default CheckVagaOcupada