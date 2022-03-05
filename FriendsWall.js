import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class FriendsWall extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      postData : [],
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
  this.getData();
}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@session_id');
  return fetch("http://localhost:3333/api/1.0.0/search?search_in=friends&q=" + this.state.search_string, {
    headers: {
      'X-Authorization':  token,
    },
      method: 'GET',
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }else if(response.status === 400){
        this.props.navigation.navigate("Log In");
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
          <Text style={styles.title}> VIEW FOLLOWERS </Text> 

        <TextInput placeholder='Search Your Friends:' style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
          marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}
          value={this.state.search_string} onChangeText={value => this.setState({search_string: value})}/>

        <TouchableOpacity> 
          <Text onPress={() => this.getData()} style={styles.search} > Search </Text>
        </TouchableOpacity> 


        <FlatList 
          data = {this.state.friendsData}
          renderItem={({item}) => (
        <View>

        <Text style={{height:30, width: 260, backgroundColor: '#858713', color: 'black', marginTop: 50, marginLeft: 75, fontSize: 22}}> 
          User Name: {item.user_givenname} {item.user_familyname} 
        </Text> 

        <TouchableOpacity>  
          <Text style={styles.viewPosts} onPress={() => this.props.navigation.navigate('FriendsWall', {user_id: item.user_id})} > View Posts </Text>
        </TouchableOpacity>

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