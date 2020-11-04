import React,{useState} from 'react'
import {Text, View, TextInput, Button, StyleSheet, ImageBackground} from 'react-native'

import background from '../../assets/fundotelainicial.png'

export default function Busca (props){

    return(
        <View style={styles.container}>
            <ImageBackground source={background} style={styles.bg}>
                <View>

                </View>
                <View>

                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    bg: {
        width: '100%',
        height: '100%'
    }
})

