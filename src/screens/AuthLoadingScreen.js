import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import auth from '@react-native-firebase/auth';

export default function AuthLoadingScreen({ navigation }) {
  
  auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.replace("HomeScreen", {name: user.email})
    } else {
      navigation.replace("LoginScreen")
    }
  })

  

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  )
}