import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, SafeAreaView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

import background from '../../assets/fundoinfocliente.png'
import estaciona from '../../assets/icons/estaciona.png'
import ion_car from '../../assets/icons/ion_car.png'
import carro from '../../assets/carro.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}
export default function InfoCliente(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dados, setDados] = useState([])

  const dadosUsuario = props.route.params.Dados
  const token = props.route.params.Token
 
  const fim = {
    "id": "fim",
    "marca": "s",
    "cor": "s",
    "placa": "Add Carro",
    "tipo": "a",
    "usuarioId": "adm"
  }

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/veiculo/cliente/' + dadosUsuario.id, {
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
        setDados(json.dados)
      }
      )
      .catch((error) => {
        console.error(error)
      })
  }, []);


  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  dados.push(fim)
  const renderItem = ({ item }) => {
    if (item.id === 'fim') {
      return (
        <View>
          <TouchableOpacity
            onPress={
              () => {
                props.navigation.navigate('CadastroVeiculo', { Dados: dadosUsuario, Token: token})
              }
            }
          >
            <ImageBackground source={ion_car} style={styles.bgCar}/>
          </TouchableOpacity>
        </View>
      )
    } else {
      const dadosCarro = {
        "id": item.id,
        "marca": item.marca,
        "cor": item.cor,
        "placa": item.placa,
        "tipo": item.tipo,
        "usuarioId": item.usuarioId
      }
      return (
        <View>
          <TouchableOpacity
            onPress={
              () => {
                props.navigation.navigate('EditVeiculo', { Carro: dadosCarro, Usuario: dadosUsuario, Token: token})
              }
            }
          >
            <ImageBackground source={carro} style={styles.bgCar}>
              <Text style={styles.placa}>{item.placa}</Text>

            </ImageBackground>
          </TouchableOpacity>
        </View>

      )
    }


  }

  return (
    // Inicio View Geral container
    <View style={styles.container}>
      {/* Inicio View principal */}
      <ImageBackground source={background} style={styles.bg}>
        {/* Inicio da Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={
              () => {
                props.navigation.navigate("OcuparVaga", { Email: dadosUsuario.email, Token: token })
              }
            }
          >
            <ImageBackground source={estaciona} style={styles.user} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>
          {dadosUsuario.nome}
        </Text>

        <SafeAreaView style={styles.carList}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />


        </SafeAreaView>





      </ImageBackground>
    </View>
    // Fim View Geral container
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  bg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vaga: {
    marginTop: 60,
    height: 360,
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  estaciona: {
    fontFamily: 'Stardos',
    fontSize: 60,
    color: '#FBFBFB'
  },
  facil: {
    fontFamily: 'Stardos',
    fontSize: 60,
    marginLeft: 150,
    color: '#FBFBFB'
  },
  inputs: {
    height: 54,
    width: 280,
    borderColor: '#FBFBFB',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    margin: 20
  },
  inputText: {
    height: 54,
    width: 244,
    marginLeft: 18,
    fontSize: 20,
  },
  botao: {
    backgroundColor: 'linear-gradient(90deg, rgba(0, 133, 255, 1) 100%, rgba(82,172,255,1) 100%)',
    width: '100%',
    height: 54,
    borderRadius: 40,
    marginTop: 22,
    marginBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 30,
    color: '#fbfbfb',
    marginTop: 5
  },
  inputTextVaga: {
    height: '100%',
    width: '100%',
    fontSize: 70,
    textAlign: 'center',
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  },
  inputVaga: {
    height: 100,
    width: 190,
    borderColor: '#FFD600',
    borderBottomWidth: 10,
    justifyContent: 'center',
    margin: 20
  },
  user: {
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 60,
    padding: 0,
    margin: 0,
    backgroundColor: '#0085FF',
    borderBottomWidth: 4,
    borderBottomColor: '#52ACFF',
    justifyContent: 'center'
  },
  botoesHeader: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 15,
  },

  bgCar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
    width: 260,
    marginTop: 150,
  },
  carList: {
    marginTop: 90,
    height: 238,
    width: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatList: {
    marginTop: 180,
    height: 600,
    width: 'auto',
    paddingRight: 60,
  },
  nome: {
    position: 'absolute',
    top: 120,
    height: 'auto',
    width: '90%',
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  },
  placa: {
    marginTop: 30,
    height: 45,
    width: 190,
    fontSize: 38,
    color: '#ffd600',
    textAlign: 'center'
  },
})
