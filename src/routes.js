import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Register from './screens/Register';

const {Navigator, Screen} = createStackNavigator();

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
