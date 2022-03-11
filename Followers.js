import React, {Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class Followers extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      // Calls the friendsData, where all the friends are stored when the user accepts friend requests
      friendsData: [],
      // The properties are set that will be required to display the friends information stored on the server 
      id: '',
      user_id: '',
      user_givenname: '',
      user_familyname: ''
}
}
  
componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
    });
    this.getFriendsFollowers();
}

componentWillUnmount() {
    this.unsubscribe();
}

// A function that returns a list of friends for any selected user 
getFriendsFollowers = async () => {
    // Gets the user id of the friend, whoms followers the user would like to view
    const {user_id} = this.props.route.params;
    // The session token is also collected to ensure the user is performing this action when logged in
    const token = await AsyncStorage.getItem('@session_token');
    // The API request that will be sent to see the friends of the selected user 
    return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/friends", {    
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
        },
        method: 'GET',// Uses the POST method as the user wants to log in
    })
    // Displays the response with all the added users by the chosen friend, or an error message is displayed and the user is sent 
    // back to the log in page as an error occured 
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }else if(response.status === 401){
            console.log('Error: No friends found');
        }else{
            throw 'Something went wrong';
        }
    })
    .then((responseJson) => {
        this.setState({
        isLoading: false,
        // Searches through the friends data
        friendsData: responseJson
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Log In');
    }
};

  render() {
    if (this.state.isLoading){ // Loads the data to be viewed by the user from the get data function
      return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            height: 200,width: 100,}}>
        </View>
      );
    }else{
      return (
        <View style={styles.body}>
            {/* The title of the page */}
            <Text style={styles.title}> VIEW FRIENDS FOLLOWERS </Text> 
        {/* Creates a flat list, where the friends data will be called and the user details such as 
        first name, last name and email will be shown, if the user has accepted friends */}
        <FlatList 
            data = {this.state.friendsData}
            renderItem={({item}) => (
        <View>
    
        <Text style={{height:130, width: 250, backgroundColor: '#858713', color: 'white', marginTop: 50, marginLeft: 75, fontSize: 22}}> 
            USER FRIENDS:  {item.user_givenname} {item.user_familyname} {item.user_email} 
         </Text> 
        </View>
        )}
             keyExtractor={(item,index) => item.user_givenname}/> 
        </View>
      );
     }
    }
  }

// A StyleSheet is declared to format the components
const styles = StyleSheet.create({
  body: {
  backgroundColor: '#60BEB0',
  flex:  1,
  display: 'flex',
},
title: {
  color: '#a8a819',
  fontSize: 22, 
  marginTop: 70,
  marginLeft: 40,
  fontWeight: 'bold',
  textAlign: 'center',
  borderWidth:  3,  
  borderColor: '#e3e327',
  backgroundColor:  '#0e8269',
  width: 350,
  height: 50,
  borderRadius: 10,
},
});

export default Followers;