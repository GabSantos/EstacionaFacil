import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const CheckVagaOcupada = (props) => {

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const carro = props.route.params.Carro
  const vaga = props.route.params.Vaga

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
        if (json.dados != null) {
          json.dados.forEach(vagas => {
            if (vagas == vaga) {
              ocupado = true
              props.navigation.goBack()
            }
          })
        }
        if (!ocupado)
          props.navigation.navigate('CarregaCarros', { Usuario: usuario, Token: token })

      })
      .catch((error) => {
        console.error(error)
      })
  }, []);




  return <Text>Carregando</Text>
}

export default CheckVagaOcupada