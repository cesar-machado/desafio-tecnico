import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Register from './screens/Register';
import EditTask from './screens/EditTask';

const {Navigator, Screen} = createStackNavigator();

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Register" component={Register} />
      <Screen name="EditTask" component={EditTask} />
    </Navigator>
  );
}
