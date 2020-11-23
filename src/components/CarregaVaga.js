import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const CarregaCarros = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carro = props.route.params.Carro
  const codVaga = props.route.params.CodVaga
  

  const url = 'http://192.168.15.11:8080/api/vaga/todas'

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
      const res = json.dados
      res.forEach(vaga => {
        if(vaga.codVaga == codVaga) {
          props.navigation.navigate('EstacionaVaga', {
            Usuario: usuario,
            Token: token,
            Carro: carro,
            Vaga: vaga.id
          })
        }
      });
    })
    .catch((error) => {
      console.error(error)
    })

  return <Text>Carregano</Text>
}

export default CarregaCarros