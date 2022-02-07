import {StatusBar} from 'react-native';
import React from 'react';
import {Routes} from './src/routes';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}
