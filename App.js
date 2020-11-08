import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Stack from './src/components/navigation/Stack'

export default function App() {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}

