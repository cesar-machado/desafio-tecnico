import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Routes} from './src/routes';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
