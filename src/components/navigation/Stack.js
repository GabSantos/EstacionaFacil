import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../../pages/Login'
import Cadastro from '../../pages/Cadastro'
import Inicial from '../../pages/Inicial'
import CadastroFuncionario from '../../pages/CadastroFuncionario'
import OcuparVaga from '../../pages/OcuparVaga'
import InfoCliente from '../../pages/InfoCliente'
<<<<<<< HEAD
=======
import EditInfo from '../../pages/EditInfo'
>>>>>>> b9b8f99b7e5706a8c5da96228b1b77acdd10a3d7

const Stack = createStackNavigator()

export default function StackFunc(props) {
  return (
<<<<<<< HEAD
    <Stack.Navigator initialRouteName="InfoCliente"
=======
    <Stack.Navigator initialRouteName="EditInfo"
>>>>>>> b9b8f99b7e5706a8c5da96228b1b77acdd10a3d7
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"
        component={Login} />
      <Stack.Screen name="Cadastro"
        component={Cadastro} />
      <Stack.Screen name="Inicial"
        component={Inicial} />
      <Stack.Screen name="CadastroFuncionario"
        component={CadastroFuncionario} />
      <Stack.Screen name="OcuparVaga"
<<<<<<< HEAD
        component={OcuparVaga}/>
      <Stack.Screen name="InfoCliente"
        component={InfoCliente}/>  
=======
        component={OcuparVaga} />
      <Stack.Screen name="InfoCliente"
        component={InfoCliente} />
      <Stack.Screen name="EditInfo"
        component={EditInfo} />
>>>>>>> b9b8f99b7e5706a8c5da96228b1b77acdd10a3d7
    </Stack.Navigator>
  );
}
