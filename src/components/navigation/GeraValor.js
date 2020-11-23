import React, { useEffect, useState } from 'react'
import { Text, Alert } from 'react-native'



const LoadingLogin = (props) => {

  const [valor, setValor] = useState('')

  const carro = props.route.params.Carro
  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const vaga = props.route.params.Vaga

  //#region Fetch Get Gera Valor
  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/vagaOcupada/Valor/' + vaga.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1AZW1haWwuY29tIiwicm9sZSI6IlJPTEVfRlVOQyIsImNyZWF0ZWQiOjE2MDU4OTI0Nzg4MzAsImV4cCI6MTYwNjQ5NzI3OH0.hr83_tQP963QQRxQpJWVXWhZ-pgIvo3AkO0yVlETsZfBbheaxcccM7FfGWIcytNNNFGa5m0j0I7Vcbp7rSHXaw'//token
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const res = json.dados
        props.navigation.navigate('AguardaPagamento', {
          Usuario: usuario,
          Token: token,
          Vaga: res,
          Carro: carro
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);
  //#endregion

  return <Text>Carregando</Text>
}

export default LoadingLogin