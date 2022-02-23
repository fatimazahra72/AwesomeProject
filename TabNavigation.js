import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import Friends from './Friends';

const Tab = createBottomTabNavigator();
function TabNavigator() {
    return (
     <NavigationContainer>
        <Tab.Navigator intitialRouteName="Main">
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Friends" component={Friends} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
export default TabNavigator;
