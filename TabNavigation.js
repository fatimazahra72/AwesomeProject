import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import Friends from './Friends';
import FriendRequest from './FriendRequest';

const Tab = createBottomTabNavigator();
function TabNavigator() {
    return (
        <Tab.Navigator intitialRouteName="Main" style={styles.tab}>
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Friends" component={Friends} />
         <Tab.Screen name="FriendRequest" component={FriendRequest} />
        </Tab.Navigator>
    );
    }
const styles = StyleSheet.create({
tab : {
    fontSize: 22, 
    backgroundColor: '#30524D', 
    width: 350, 
    height: 40, 
    marginLeft: 40, 
    borderWidth: 2.5, 
    borderColor: '#FFFFFF', 
    marginBottom: 25, 
    color: 'black'
},
});

export default TabNavigator;