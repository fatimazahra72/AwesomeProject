import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class FriendsWall extends Component {
  constructor(props){
    super(props);
    this.state = {
    // Sets all the properties that will be used to provide results of friends details
      isLoading: true,
      friendsData: [],
      text : '',
      post: '',
      post2: '',
      post_id: '',
      id: '',
      user_id: '',
      search_string: '',
      photo: null
    }
  }
  
componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
  });
  this.searchMyFriends();
}

componentWillUnmount() {
  this.unsubscribe();
}

// A function which allows the user to search for the users they have added as friends 
searchMyFriends = async () => {
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@session_id');
  // The API request which is sent to allow the users to use the query search to find friends they have added
  return fetch("http://localhost:3333/api/1.0.0/search?search_in=friends&q=" + this.state.search_string, {
    headers: {
      'X-Authorization':  token,
    },
      method: 'GET',
    })
    .then((response) => {
      // If search has been completed then the results of the user details will be displayed
      if(response.status === 200){
        return response.json()
        // Else, if the result cannot be found then, the user will be returned to the main screen
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


render() {
  if (this.state.isLoading){
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        height: 200, width: 100,}}>
      </View>
      );
    }else{
      return (
        <View style={styles.body}>
        <ScrollView>
          {/* The title of the page */}
        <Text style={styles.title}> VIEW FOLLOWERS </Text> 
          {/* A text input box in which the user can enter a name of the friend they would like to search for from their friends list,
          then a result will be shown accordingly */}
        <TextInput placeholder='Search Your Friends:' style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
          marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}
          value={this.state.search_string} onChangeText={value => this.setState({search_string: value})}/>

        {/* The corresponding search friends function will be called to search for the user name  entered 
        within the input box and display it if the user exists in your riends list  */}
        <TouchableOpacity> 
          <Text onPress={() => this.searchMyFriends()} style={styles.search} > Search </Text>
        </TouchableOpacity> 

        {/* A flatlist created to c=obtain data from the friends data array and then, display the account information 
        such as first and last name of the friends that the user could possibly be searching for */}
        <FlatList 
          data = {this.state.friendsData}
          renderItem={({item}) => (
        <View>

        <Text style={{height:30, width: 260, backgroundColor: '#858713', color: 'black', marginTop: 50, marginLeft: 75, fontSize: 22}}> 
          User Name: {item.user_givenname} {item.user_familyname} 
        </Text> 

        {/* A button that is linked to the stack navigation, this allows you to navigate to the Friends Wall page, where the user can
        view their friends posts; like and dislike them. Also, the user can post on their friends wall here */}
        <TouchableOpacity>  
          <Text style={styles.viewPosts} onPress={() => this.props.navigation.navigate('FriendsWall', {user_id: item.user_id})} > View Posts </Text>
        </TouchableOpacity>

        {/* A button that is linked to the followers page via the stack navigation, when the user clicks on 
        this button they'll be able to view the followers of the users that are their friends*/}
        <TouchableOpacity>  
          <Text style={styles.viewFriends} onPress={() => this.props.navigation.navigate('Followers', {user_id: item.user_id})} > View User Friends </Text>
        </TouchableOpacity>
        </View>
        )}
            keyExtractor={(item,index) => item.user_givenname}/> 
        </ScrollView>
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
  marginTop: 50,
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
viewPosts: {
  fontSize: 22,
  color: '#FFFFFF',
  backgroundColor: '#81CD2A',
  width: 140,
  height: 50, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft: 140,
  marginTop: 40,
  textAlign: 'center',
  borderRadius: 20,
},
viewFriends: {
  fontSize: 22,
  color: '#FFFFFF',
  backgroundColor: '#5f9e06',
  width: 180,
  height: 80, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft: 120,
  marginTop: 40,
  textAlign: 'center',
  borderRadius: 20,
},
viewProfilePic: {
  fontSize: 22,
  color: '#FFFFFF',
  backgroundColor: '#5f9e06',
  width: 180,
  height: 110, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft: 120,
  marginTop: 40,
  textAlign: 'center',
  borderRadius: 20,
}
});

export default FriendsWall;