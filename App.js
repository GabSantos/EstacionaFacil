import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Stack from './src/components/navigation/Stack'

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>  
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0085FF',
  }
})
