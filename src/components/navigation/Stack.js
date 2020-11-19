import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoadingLogin from './LoadingLogin'

import Login from '../../pages/Login'
import Cadastro from '../../pages/Cadastro'
import Inicial from '../../pages/Inicial'
import CadastroFuncionario from '../../pages/CadastroFuncionario'
import OcuparVaga from '../../pages/OcuparVaga'
import DesocuparVaga from '../../pages/DesocuparVaga'
import InfoCliente from '../../pages/InfoCliente'
import EditInfo from '../../pages/EditInfo'
import MainFuncionario from '../../pages/MainFuncionario'

const Stack = createStackNavigator()

export default function StackFunc(props) {
  return (

    <Stack.Navigator initialRouteName="Inicial"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"
        component={Login} />
      <Stack.Screen name="LoadingLogin"
        component={LoadingLogin} />
      <Stack.Screen name="Cadastro"
        component={Cadastro} />
      <Stack.Screen name="Inicial"
        component={Inicial} />
      <Stack.Screen name="CadastroFuncionario"
        component={CadastroFuncionario} />
      <Stack.Screen name="OcuparVaga"
        component={OcuparVaga} />
      <Stack.Screen name="DesocuparVaga"
        component={DesocuparVaga} />
      <Stack.Screen name="InfoCliente"
        component={InfoCliente} />
      <Stack.Screen name="EditInfo"
        component={EditInfo} />
      <Stack.Screen name="MainFuncionario"
        component={MainFuncionario} />
    </Stack.Navigator>
  );
}
