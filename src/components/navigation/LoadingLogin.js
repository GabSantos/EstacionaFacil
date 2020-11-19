import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const Loading = (props) => {
  const [token, setToken] = useState('')
  const [tipo, setTipo] = useState('')
  const [id, setId] = useState('')

  const email = props.route.params.emailCliente
  const nome = props.route.params.nomeCliente
  const senha = props.route.params.senhaCliente
  const telefone = props.route.params.telefoneCliente

  if (props.route.params.login) {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'senha': senha
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 400) {
              Alert.alert("Email e/ou senha incorreto(s)");
              props.navigation.goBack()
            }
          }
          return response.json()
        })
        .then((json) => {
          setToken(json.dados.token)
          
        }
        )
        .catch((error) => {
          console.error(error)
        })
    }, []);

    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/usuario/' + email, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 400) {
              Alert.alert("Email e/ou senha incorreto(s)");
              props.navigation.goBack()
            }
          }
          return response.json()
        })
        .then((json) => {
          setTipo(json.dados.tipo)
          setId(json.dados.id)
        }
        )
        .catch((error) => {
          console.error(error)
        })
    }, []);
  } else {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/usuario/cliente', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'nome': nome,
          'email': email,
          'senha': senha,
          'telefone': telefone
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 400) {
              Alert.alert("Ocorreu um erro");
              props.navigation.goBack()
            }
          }
          return response.json()
        })
        .then((json) => {
          setTipo(json.dados.tipo)
          setId(json.dado.id)
        }
        )
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);

    useEffect(() => {
      fetch('http://192.168.15.11:8080/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'senha': senha
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status == 400) {
              Alert.alert("Email e/ou senha incorreto(s)");
              props.navigation.goBack()
            }
          }
          return response.json()
        })
        .then((json) => {
          setToken(json.dados.token)
        }
        )
        .catch((error) => {
          console.error(error)
        })
    }, []);
  }
  if(tipo == 'C'){
    props.navigation.navigate('OcuparVaga',{ Id: id, Tipo: tipo, Email: email, Token: token})
  } else {
    props.navigation.navigate('MainFuncionario', { Id: id, Tipo: tipo, Email: email, Token: token })
  }
  return <></>
}

export default Loading