import React, { Component } from 'react';
import { StyleSheet, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import Friends from './Friends';
import FriendRequest from './FriendRequest';
import home from './assets/home.png';
import friends from './assets/friendsRequest.png';
import addFriends from './assets/addFriends.png';

const Tab = createBottomTabNavigator();
function TabNavigator() {
    return (
    <Tab.Navigator intitialRouteName="Main" style={styles.tab}>
        <Tab.Screen name="Main" component={Main}
        options={{
            tabBarIcon: () => (<Image source={home} style={{width: 40, height: 40}}
        />) }} />
        <Tab.Screen name="Add Friends" component={Friends} 
         options={{
            tabBarIcon: () => (<Image source={addFriends} style={{width: 40, height: 40}}
        />) }} />
        <Tab.Screen name="Friend Requests" component={FriendRequest} 
         options={{
            tabBarIcon: () => (<Image source={friends} style={{width: 40, height: 40}}
        />) }} />
    </Tab.Navigator>
    );
    }
const styles = StyleSheet.create({
tab : {
    fontSize: 40, 
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