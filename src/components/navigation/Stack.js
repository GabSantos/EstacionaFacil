import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import LoadingLogin from './LoadingLogin'
import UpdateUser from './UpdateUser'
import UpdateCarro from './UpdateCarro'
import UpdateFuncionario from './UpdateFuncionario'
import UpdateVaga from './UpdateVaga'
import EstacionaVaga from './EstacionaVaga'
import GeraValor from './GeraValor'
import CheckUserStatus from './CheckUserStatus'

import CheckVagaOcupada from '../CheckVagaOcupada'
import CarregaCarros from '../CarregaCarros'
import CarregaVaga from '../CarregaVaga'
import CheckPagamento from '../CheckPagamento'
import CarregaVagas from '../CarregaVagas'
import CarregaVagasOcupadas from '../CarregaVagasOcupadas'
import ConfirmaPagamento from '../ConfirmaPagamento'


import Login from '../../pages/Login'
import Cadastro from '../../pages/Cadastro'
import Inicial from '../../pages/Inicial'
import CadastroFuncionario from '../../pages/CadastroFuncionario'
import OcuparVaga from '../../pages/OcuparVaga'
import DesocuparVaga from '../../pages/DesocuparVaga'
import InfoCliente from '../../pages/InfoCliente'
import EditInfo from '../../pages/EditInfo'
import EditVaga from '../../pages/EditVaga'
import MainFuncionario from '../../pages/MainFuncionario'
import Veiculos from '../../pages/Veiculos'
import EditVeiculo from '../../pages/EditVeiculo'
import CadastroVeiculo from '../../pages/CadastroVeiculo'
import Funcionarios from '../../pages/Funcionarios'
import EditFuncionario from '../../pages/EditFuncionario'
import Vagas from '../../pages/Vagas'
import CadastroVaga from '../../pages/CadastroVaga'
import AguardaPagamento from '../../pages/AguardaPagamento'

const Stack = createStackNavigator()

export default function StackFunc(props) {
  return (

    <Stack.Navigator initialRouteName="Inicial"
      screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Inicial"
        component={Inicial} />
      <Stack.Screen name="Login"
        component={Login} />
      <Stack.Screen name="Cadastro"
        component={Cadastro} />
      <Stack.Screen name="LoadingLogin"
        component={LoadingLogin} />
      <Stack.Screen name="CheckUserStatus"
        component={CheckUserStatus} />
      <Stack.Screen name="CheckVagaOcupada"
        component={CheckVagaOcupada} />
      <Stack.Screen name="CarregaCarros"
        component={CarregaCarros} />

      <Stack.Screen name="GeraValor"
        component={GeraValor} />
      <Stack.Screen name="CheckPagamento"
        component={CheckPagamento} />
      <Stack.Screen name="ConfirmaPagamento"
        component={ConfirmaPagamento} />
      <Stack.Screen name="OcuparVaga"
        component={OcuparVaga} />
      <Stack.Screen name="DesocuparVaga"
        component={DesocuparVaga} />
      <Stack.Screen name="CarregaVaga"
        component={CarregaVaga} />
      <Stack.Screen name="EstacionaVaga"
        component={EstacionaVaga} />
      <Stack.Screen name="EditVaga"
        component={EditVaga} />
      <Stack.Screen name="Vagas"
        component={Vagas} />
      <Stack.Screen name="CadastroVaga"
        component={CadastroVaga} />
      <Stack.Screen name="UpdateVaga"
        component={UpdateVaga} />
      <Stack.Screen name="AguardaPagamento"
        component={AguardaPagamento} />
      <Stack.Screen name="CarregaVagas"
        component={CarregaVagas} />
      <Stack.Screen name="CarregaVagasOcupadas"
        component={CarregaVagasOcupadas} />

      <Stack.Screen name="InfoCliente"
        component={InfoCliente} />
      <Stack.Screen name="EditInfo"
        component={EditInfo} />
      <Stack.Screen name="UpdateUser"
        component={UpdateUser} />

      <Stack.Screen name="MainFuncionario"
        component={MainFuncionario} />
      <Stack.Screen name="CadastroFuncionario"
        component={CadastroFuncionario} />
      <Stack.Screen name="EditFuncionario"
        component={EditFuncionario} />
      <Stack.Screen name="Funcionarios"
        component={Funcionarios} />
      <Stack.Screen name="UpdateFuncionario"
        component={UpdateFuncionario} />

      <Stack.Screen name="Veiculos"
        component={Veiculos} />
      <Stack.Screen name="EditVeiculo"
        component={EditVeiculo} />
      <Stack.Screen name="CadastroVeiculo"
        component={CadastroVeiculo} />
      <Stack.Screen name="UpdateCarro"
        component={UpdateCarro} />


    </Stack.Navigator>
  );
}
