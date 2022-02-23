import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Main from './Main';
import FeedScreen from './Main';
import LogOut from './LogOut';

const Stack = createNativeStackNavigator();

function navigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator intitialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Log In" component={LogIn} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Log Out" component={LogOut} />
      </Stack.Navigator>
       </NavigationContainer>
);
}
 export default navigator;
