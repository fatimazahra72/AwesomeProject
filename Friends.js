import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Sets all the props that will be used to provide results of existing friend details and addomg friends to the 
      // user
      isLoading: true,
      friendsData : [],
      search_string: '',
      user_givenname: '',
      user_familyname: '',
      email: '',
      password: '',
      id: '',
      user_id: '',
      friends: '',
  }
}

componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
  });
  this.getFriends();
}

componentWillUnmount() {
  this.unsubscribe();
}

// A function to search for the the users on a system
getFriends = async () => {
  // The session id and token are taken from async storage to ensure the user is logged in
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@session_id');
  // The API request that is uses the query technique in order to allow the user to search for a name of the people
  // that are registered onto the system
  return fetch("http://localhost:3333/api/1.0.0/search?q=" + this.state.search_string, {
    headers: {
      'X-Authorization':  token
    },
    method: 'GET',
  })
  .then((response) => {
    // If the entered user exists then, the request is fulfilled with the result
    if(response.status === 200){
      return response.json()
    // Else if the user cannot be found then, the user must be returned to the main feed screen
    }else if(response.status === 401){
      this.props.navigation.navigate("Main");
    }else{
      throw 'Something went wrong';
      }
    })
  .then((responseJson) => {
    this.setState({
      isLoading: false,
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

// A function that will allow the user to add a new friend
addFriends = async (user_id) => {
  // The session token is taken from async storage to ensure the user is logged in
  const token = await AsyncStorage.getItem('@session_token');
  // The API request that is used to take the selected users id and add them as friend
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id +"/friends", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    method: 'POST',
  })
  .then((response) => { 
    // If the friend can be added successfully then, a message will be displayed that the friend request has been sent 
    // for the user to accept or decline
    if(response.status === 200){
      console.log("Friend request has been submitted");
    }else if(response.status === 401){
      // Else, if the friend was not added then, a message will be displayed that the friend request was not
      // submitted 
      console.log("Error: Could not add friend")
    }else if (response.status=== 403){
      console.log("Something went wrong");
      }
  })
  .catch((error) => {
    console.log(error);
  })
}

  render() {
    if (this.state.isLoading){
      return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          height: 200, width: 100, }}>
        </View>
      );
    }else{
      return (
        <View style={styles.body}>
          {/* The title of the page */}
        <Text style={styles.title}> SEND FRIEND REQUESTS TO ADD MAKE ONLINE CONNECTIONS </Text> 

        {/* A text input box in which the user can enter a name of the friend they would like to add, it will be searched
        according to the entered value */}
        <TextInput placeholder='Enter Username to Add Friend:' style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
          marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}
          value={this.state.search_string} onChangeText={value => this.setState({search_string: value})}/>

        {/* The corresponding get friends function will be called to search for the user name within the system  */}
        <TouchableOpacity> 
          <Text onPress={() => this.getFriends()} style={styles.search} > Search </Text>
        </TouchableOpacity> 

        {/* A flatlist created to c=obtain data from the friends data array and then, display the account information 
        such as first and last name of the friends that the user could possibly be searching for */}
        <FlatList
          data = {this.state.friendsData}
          renderItem={({item}) => (
        <View>
        <Text style={{height:20, width: 200, backgroundColor: '#858713', color: 'black', marginTop: 20, marginLeft: 110}}> 
          User Name: {item.user_givenname} {item.user_familyname}
        </Text>
        
        {/* A button implemented using the add friends function, this will allow the user to send a friend request to
        increase their connections */}
        <TouchableOpacity> 
          <Text onPress={() => this.addFriends(item.user_id)} style={styles.addFriendsButton} > Send Friend Request </Text>
        </TouchableOpacity> 
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
title : {
  color: '#033329',
  fontSize: 22, 
  marginTop: 40,
  marginLeft: 80,
  fontWeight: 'bold',
  textAlign: 'center',
  borderWidth:  3,  
  borderColor: '#e3e327',
  backgroundColor:  '#0e8269',
  width: 280,
  height: 120,
},
search : {
  fontSize: 28,
  color: '#f2f553',
  backgroundColor: '#81CD2A',
  width: 160,
  height: 50, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft: 135,
  marginTop: 30,
  textAlign: 'center'
},
addFriendsButton: {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: '#25e849',
  width: 220,
  height: 40, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 100,
  marginTop: 30,
  textAlign: 'center'
},
});

export default Friends;