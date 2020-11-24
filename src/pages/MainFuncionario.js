import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import background from '../../assets/fundotelainicial.png'

import user from '../../assets/icons/user.png'
import users from '../../assets/icons/users.png'
import carro from '../../assets/icons/carro.png'
import estaciona from '../../assets/icons/estaciona.png'
import esquerda from '../../assets/esquerda.png'
import direita from '../../assets/direita.png'

const fetchFonts = () => {
  return loadAsync({
    'Stardos': require('../../assets/fonts/StardosStencil-Bold.ttf'),
    'Modak': require('../../assets/fonts/Modak-Regular.ttf')
  })
}

export default function MainFuncionario(props) {
  const [dataLoaded, setDataLoaded] = useState(false)

  const usuario = props.route.params.Usuario
  const token = props.route.params.Token
  const vagas = props.route.params.Vagas
  const vagasOcupadas = props.route.params.VagasOcupadas

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }



  let cont = 1
  const renderItem = ({ item }) => {
    let bgList
    if (cont % 2 != 0) {
      bgList = esquerda
      cont++
    } else {
      bgList = direita
      cont++
    }

    let objVaga
    vagas.forEach(vaga => {
      if (vaga.id == item.vaga)
        objVaga = vaga
    });

    const objVagaOcupada = {
      "id": item.id,
      "horaEntrada": item.horaEntrada,
      "horaSaida": item.horaSaida,
      "valor": item.valor,
      "paga": item.paga,
      "vaga": item.vaga,
      "veiculo": item.veiculo
    }

    const status = objVagaOcupada.horaSaida ? "Aguardando pagamento" : "Ocupado"
    const horario = objVagaOcupada.horaSaida ? "R$" + objVagaOcupada.valor : objVagaOcupada.horaEntrada.slice(11)

    if (objVagaOcupada.horaSaida) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ConfirmaPagamento', { Vaga: objVagaOcupada, Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={bgList} style={styles.funcionarioContainer}>
              <Text style={styles.codVaga}>{objVaga.codVaga}</Text>
              <Text style={styles.status}>{status}</Text>
              <Text style={styles.preco}>{horario}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <ImageBackground source={bgList} style={styles.funcionarioContainer}>
            <Text style={styles.codVaga}>{objVaga.codVaga}</Text>
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.preco}>{horario}</Text>
          </ImageBackground>
        </View>
      )
    }

  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("CadastroFuncionario", { Usuario: usuario, Token: token })
            }}
          >
            <ImageBackground source={user} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("Funcionarios", { Usuario: usuario, Token: token }) // Listar todos funcionarios
            }}
          >
            <ImageBackground source={users} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("Vagas", { Usuario: usuario, Token: token }) //Listar todas vagas
            }}
          >
            <ImageBackground source={estaciona} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("CadastroVaga", { Usuario: usuario, Token: token }) // Cadastrar nova vaga
            }}
          >
            <ImageBackground source={carro} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <SafeAreaView style={styles.funcList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={vagasOcupadas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            props.navigation.navigate('CarregaVagas', { Usuario: usuario, Token: token })
          }}
        >
          <Text style={styles.botaoText}>
            Atualizar
            </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
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
  },
  vaga: {
    marginTop: 60,
    height: '100%',
    width: '100%',
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
    backgroundColor: 'linear-gradient(90deg, rgba(255, 514, 0, 1) 100%, rgba(250,255,0,1) 100%)',
    width: 240,
    height: 50,
    borderRadius: 40,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoText: {
    fontFamily: 'Modak',
    fontSize: 25,
    color: '#0085FF',
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
  icon: {
    width: '100%',
    height: '100%'
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  botoesHeader: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginRight: 25,
  },
  direita: {
    height: 60,
    width: '100%',
    backgroundColor: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255,255,0,1) 50%)',
    flexDirection: 'row'
  },
  esquerda: {
    height: 60,
    width: '100%',
    backgroundColor: 'linear-gradient(90deg, rgba(255, 255, 0, 1) 50%, rgba(255,255,255,1) 0%)',
    flexDirection: 'row'
  },
  flatList: {
    marginTop: 60,
    width: '100%',
    height: 'auto'
  },
  funcList: {
    width: '100%',
    height: 'auto'
  },
  status: {
    textAlign: 'center',
    marginRight: 17,
    fontSize: 20,
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  },
  preco: {
    position: 'absolute',
    right: 13,
    textAlign: 'center',
    margin: 5,
    fontSize: 22,
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  },
  codVaga: {
    position: 'absolute',
    left: 13,
    textAlign: 'center',
    margin: 5,
    fontSize: 22,
    fontFamily: 'Stardos',
    color: '#fbfbfb',
  },
  funcionarioContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})