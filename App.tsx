//App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import ImageScreen from './screens/ImageScreen';
import AnimationScreen from './screens/AnimationScreen';
import NetworkScreen from './screens/NetworkScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Image" component={ImageScreen} />
          <Stack.Screen name="Animation" component={AnimationScreen} />
          <Stack.Screen name="Network" component={NetworkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;