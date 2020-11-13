import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../../pages/Login'
import Cadastro from '../../pages/Cadastro'
import Inicial from '../../pages/Inicial'
import CadastroFuncionario from '../../pages/CadastroFuncionario'
import OcuparVaga from '../../pages/OcuparVaga'

const Stack = createStackNavigator()

export default function StackFunc(props) {
  return (
    <Stack.Navigator initialRouteName="CadastroFuncionario"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"
        component={Login}/>
      <Stack.Screen name="Cadastro"
        component={Cadastro}/>
      <Stack.Screen name="Inicial"
        component={Inicial}/>
      <Stack.Screen name="CadastroFuncionario"
      component={CadastroFuncionario}/>
      <Stack.Screen name="OcuparVaga"
        component={OcuparVaga}/>  
    </Stack.Navigator>
  );
}
