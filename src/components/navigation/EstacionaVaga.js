import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const UpdateFuncionario = (props) => {
  const [vaga, setVaga] = useState({})

  const carro = props.route.params.Carro
  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const codVaga = props.route.params.CodVaga

  //#region Fetch Get vaga
    fetch('http://192.168.15.11:8080/api/vaga/todas', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1AZW1haWwuY29tIiwicm9sZSI6IlJPTEVfRlVOQyIsImNyZWF0ZWQiOjE2MDU4OTI0Nzg4MzAsImV4cCI6MTYwNjQ5NzI3OH0.hr83_tQP963QQRxQpJWVXWhZ-pgIvo3AkO0yVlETsZfBbheaxcccM7FfGWIcytNNNFGa5m0j0I7Vcbp7rSHXaw'//token
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const res = json.dados
        res.forEach(element => {
          if (element.codVaga == codVaga) {
            setVaga(element.id)
          }
        });
      })
      .catch((error) => {
        console.error(error)
      })
  //#endregion
  //#region Fetch Get vaga
    fetch('http://192.168.15.11:8080/api/vagaOcupada', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        'vaga': vaga,
        'veiculo': carro.id
      })
    })
      .then((response) => {
        console.log(response.status)
        return response.json()
      })
      .then((json) => {
        if (json.dados === null) {
          json.erros.forEach(erro => {
            Alert.alert(erro)
          })
          props.navigation.goBack()
        } else {
          props.navigation.navigate('DesocuparVaga', {
            Usuario: usuario,
            Token: token,
            Vaga: json.dados,
            Carro: carro
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  //#endregion



  return <Text>0</Text>
}

export default UpdateFuncionario