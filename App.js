import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Main from './Main';
import LogOut from './LogOut';
import TabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator();

function navigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator intitialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Log Out" component={LogOut} />
      </Stack.Navigator>
       </NavigationContainer>
);
}
 export default navigator;