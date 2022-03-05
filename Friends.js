import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
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
  this.getData();
}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@session_id');
  return fetch("http://localhost:3333/api/1.0.0/search?q=" + this.state.search_string, {
    headers: {
      'X-Authorization':  token
    },
    method: 'GET',
  })
.then((response) => {
  if(response.status === 200){
    return response.json()
  }else if(response.status === 400){
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

addFriends = async (user_id) => {
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id +"/friends", {    
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      method: 'POST',// Uses the POST method as the user wants to log in
    })
  .then((response) => { 
      if(response.status === 200){
          console.log("Friend request has been submitted");
      }else if(response.status === 401){
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
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          width: 100,
          }}>
        </View>
      );
    }else{
      return (
        <View style={styles.body}>
        <Text style={styles.title}> SEND FRIEND REQUESTS TO ADD MAKE ONLINE CONNECTIONS </Text> 

      <TextInput placeholder='Enter Username to Add Friend:' style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
        marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}
        value={this.state.search_string} onChangeText={value => this.setState({search_string: value})}/>

      <TouchableOpacity> 
      <Text onPress={() => this.getData()} style={styles.search} > Search </Text>
      </TouchableOpacity> 

      
      <FlatList
        data = {this.state.friendsData}
        renderItem={({item}) => (
      <View>
      <Text style={{height:20, width: 200, backgroundColor: '#858713', color: 'black', marginTop: 20, marginLeft: 110}}> 
        User Name: {item.user_givenname} {item.user_familyname}
      </Text>
            
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