
import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native'
import { loadAsync } from 'expo-font'
import { AppLoading } from 'expo'

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
  const [vagasOcupadas, setVagasOcupadas] = useState([])
  const [vagas, setVagas] = useState([])
  const [objVaga, setObjVaga] = useState({})
  const usuario = props.route.params.Dados
  const token = props.route.params.Token

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/vagaOcupada/VagasOcupadasNaoPagas', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setVagasOcupadas(json.dados)
      }
      )
      .catch((error) => {
        console.error(error)
      })
  }, []);

  useEffect(() => {
    fetch('http://192.168.15.11:8080/api/vaga/todas', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setVagas(json.dados)
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

  const run = map =>{
    var data = new Date(map),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora = (data.getHours()-3).toString(),
        minuto = data.getMinutes().toString();
    return (hora + "").padStart(2,"0") + ":" + (minuto + "").padStart(2,"0");
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


    vagas.forEach(element => {
      if (item.vaga == element.id) {
        setObjVaga({
          "id": element.id,
          "codVaga": element.codVaga,
          "disponivel": element.disponivel
        })
      }
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
    const horario = objVagaOcupada.horaSaida ? "R$" + objVagaOcupada.valor : run(objVagaOcupada.horaEntrada)

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            //props.navigation.navigate('ConfirmaPagamento', { Vaga: objVaga, Usuario: usuario, Token: token })
          }}
        >
          <ImageBackground source={bgList} style={styles.funcionarioContainer}>
            <Text style={styles.codVaga}>{objVaga.codVaga}</Text>
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.status}>{status}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

    )



  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.bg}>
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("CadastroFuncionario", { Dados: dados, Token: token })
            }}
          >
            <ImageBackground source={user} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("Funcionarios", { Dados: dados, Token: token }) // Listar todos funcionarios
            }}
          >
            <ImageBackground source={users} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("Vagas", { Dados: dados, Token: token }) //Listar todas vagas
            }}
          >
            <ImageBackground source={estaciona} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botoesHeader}
            onPress={() => {
              props.navigation.navigate("CadastroVaga", { Dados: dados, Token: token }) // Cadastrar nova vaga
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
    justifyContent: 'center',
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
})