import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import TelaLogin from '../../pages/TelaLogin'

const Stack = createStackNavigator()

export default function StackFunc (props){
    return(
        <Stack.Navigator initialRouteName="Login"
            screenOptions={{headerShown: false}}> 
            <Stack.Screen name="Login" 
                component={TelaLogin}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}
