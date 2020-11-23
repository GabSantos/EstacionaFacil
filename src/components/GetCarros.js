import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const LoadingLogin = (props) => {

  const [carros, setCarros] = useState([])

  const token = props.route.params.Token
  const usuario = props.route.params.Usuario

  //#region Fetch Get Veiculos by user ID
  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/veiculo/cliente/' + usuario.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const cars = json.dados
        setCarros(cars)
        props.navigation.navigate('OcuparVaga', { Usuario: usuario, Token: token, Carros: carros })
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);
  //#endregion

  //#region Checa se usuario esta estacionado
  // useEffect(() => {
  //   fetch('http://192.168.15.11:8080/api/vagaOcupada/VagasOcupadasNaoPagas', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1AZW1haWwuY29tIiwicm9sZSI6IlJPTEVfRlVOQyIsImNyZWF0ZWQiOjE2MDU4OTI0Nzg4MzAsImV4cCI6MTYwNjQ5NzI3OH0.hr83_tQP963QQRxQpJWVXWhZ-pgIvo3AkO0yVlETsZfBbheaxcccM7FfGWIcytNNNFGa5m0j0I7Vcbp7rSHXaw'//token
  //     },
  //   })
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((json) => {
  //       const vagasOcupadas = json.dados
  //       console.log(vagasOcupadas)
  //       if (vagasOcupadas != null) {
  //         vagasOcupadas.forEach(vaga => {
  //           carros.forEach(veiculo => {
  //             if (vaga.veiculo == veiculo.id) {
  //               props.navigation.navigate('DesocuparVaga', {
  //                 Usuario: usuario,
  //                 Token: token,
  //                 Vaga: vaga,
  //                 Carro: veiculo
  //               })
  //             }
  //           })
  //         })
  //       }
  //       props.navigation.navigate('OcuparVaga', {
  //         Usuario: usuario,
  //         Token: token,
  //         Carros: carros
  //       })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, []);
  //#endregion
  return <Text>Carregando</Text>
}

export default LoadingLogin