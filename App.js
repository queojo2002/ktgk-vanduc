import React, { useContext, useEffect, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import auth from '@react-native-firebase/auth';

const App = () => {
  const Stack = createNativeStackNavigator()


  return (
    <Provider >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: true,
          }}
        >

          <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;