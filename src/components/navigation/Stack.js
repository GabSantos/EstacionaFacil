import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoadingLogin from './LoadingLogin'
import UpdateUser from './UpdateUser'
import UpdateCarro from './UpdateCarro'
import UpdateFuncionario from './UpdateFuncionario'

import Login from '../../pages/Login'
import Cadastro from '../../pages/Cadastro'
import Inicial from '../../pages/Inicial'
import CadastroFuncionario from '../../pages/CadastroFuncionario'
import OcuparVaga from '../../pages/OcuparVaga'
import DesocuparVaga from '../../pages/DesocuparVaga'
import InfoCliente from '../../pages/InfoCliente'
import EditInfo from '../../pages/EditInfo'
import MainFuncionario from '../../pages/MainFuncionario'
import Veiculos from '../../pages/Veiculos'
import EditVeiculo from '../../pages/EditVeiculo'
import CadastroVeiculo from '../../pages/CadastroVeiculo'
import Funcionarios from '../../pages/Funcionarios'
import EditFuncionario from '../../pages/EditFuncionario'
import Vagas from '../../pages/Vagas'
import CadastroVaga from '../../pages/CadastroVaga'

const Stack = createStackNavigator()

export default function StackFunc(props) {
  return (

    <Stack.Navigator initialRouteName="MainFuncionario"
      screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Inicial"
        component={Inicial} />
      <Stack.Screen name="Login"
        component={Login} />
      <Stack.Screen name="Cadastro"
        component={Cadastro} />
      <Stack.Screen name="LoadingLogin"
        component={LoadingLogin} />

      <Stack.Screen name="OcuparVaga"
        component={OcuparVaga} />
      <Stack.Screen name="DesocuparVaga"
        component={DesocuparVaga} />
      <Stack.Screen name="Vagas"
        component={Vagas} />
      <Stack.Screen name="CadastroVaga"
        component={CadastroVaga} />

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
