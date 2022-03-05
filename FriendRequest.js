import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class FriendRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      friendsData : [],
      first_name: '',
      last_name: '',
      id: '',
      user_id: '',
      email:'',
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
  return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
    headers: {
      'X-Authorization':  token
    },
    method: 'GET',
})
  .then((response) => {
    if(response.status === 200){
      return response.json()
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
    this.props.navigation.navigate('LogIn');
  }
};

acceptFriends = async (user_id) => {
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+ user_id, {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',
  })
.then((response) => {
    if(response.status === 200){
      console.log("Accepted the friend request");
    }else if(response.status === 401){
      console.log("Error: No more friend requests to be accepted")
    }else{
      throw 'Something went wrong';
    }
})
  .catch((error) => {
    console.log(error);
  })
}

rejectFriend = async (user_id) => {
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+ user_id, {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'DELETE',
  })
.then((response) => {
    if(response.status === 200){
      console.log("Friend request has been rejected");
    }else if(response.status === 401){
      console.log("Error: No more friend requests to be accepted")
    }else{
      throw 'Something went wrong';
    }
})
  .catch((error) => {
    console.log(error);
  })
}

render() {
  if (this.state.isLoading){
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        height: 200, width: 100,}}>
      </View>
    );
    }else{
      return (
        <View style={styles.body}>
          <Text style={styles.name}> YOUR OUTSTANDING FRIEND REQUESTS </Text> 
          <FlatList
            data = {this.state.friendsData}
            renderItem={({item}) => (
          <View>
          <Text style={{height:100, width: 320, height: 80, backgroundColor: '#858713', color: 'black', marginTop: 80, fontSize: 26, marginLeft: 55}}> 
            Incoming Friend Requests: {item.first_name} {item.last_name}
          </Text>

          <TouchableOpacity> 
            <Text onPress={() => this.acceptFriends(item.user_id)} style={styles.acceptFriendButton} > Accept Request </Text>
          </TouchableOpacity> 

          <TouchableOpacity> 
            <Text onPress={() => this.rejectFriend(item.user_id)} style={styles.rejectFriendButton} > Reject Request  </Text>
          </TouchableOpacity>  
          </View>
        )}
          keyExtractor={(item,index) => item.user_givenname} /> 
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
name : {
  color: '#033329',
  fontSize: 22, 
  marginTop: 60,
  marginLeft: 80,
  fontWeight: 'bold',
  textAlign: 'center',
  borderWidth:  3,  
  borderColor: '#e3e327',
  backgroundColor:  '#0e8269',
  width: 280,
  height: 70,
},
acceptFriendButton : {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: '#25e849',
  width: 130,
  height: 70, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 230,
  marginTop: 40,
  textAlign: 'center'
},
rejectFriendButton : {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: 'red',
  width: 100,
  height: 70, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 55,
  marginTop: -70,
  textAlign: 'center'
},
});

export default FriendRequest;