import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import PostWall from './PostWall';

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
      email:'',
      search_friends: '',
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
    return fetch("http://localhost:3333/api/1.0.0/search?search_in=friends" + this.state.search_friends, {
          headers: {
            'X-Authorization':  token,
          },
          method: 'GET'
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

//   newPost = async () => {
//     const id = await AsyncStorage.getItem('@session_id');
//     const token = await AsyncStorage.getItem('@session_token');
//     return fetch("http://localhost:3333/api/1.0.0/user/"+ id+ "/post", {    
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Authorization': token
//         },
//         method: 'POST',// Uses the POST method as the user wants to log in
//         body: JSON.stringify({"text": this.state.post})
//       })
//       // Sends an alert message if the user has entered the correct details matching to a user 
//       // ID and then user is logged in
//     .then((response) => {
//         if(response.status === 201){
//             //return response.json()
//             console.log("Post has been uploaded successful");
//             this.getData();
//         }else if(response.status === 400){
//             console.log("Error: Could not upload post")
//         }else{
//             throw 'Something went wrong';
//         }
//     })
//       .catch((error) => {
//         console.log(error);
//         this.getData();
//       })
//   }

//   removePost = async (post_id) => {
//     const id = await AsyncStorage.getItem('@session_id');
//     const token = await AsyncStorage.getItem('@session_token');
//     return fetch("http://localhost:3333/api/1.0.0/user/"+ id+ "/post/" + post_id, {    
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Authorization': token
//         },
//         method: 'DELETE',// Uses the POST method as the user wants to log in
//         // body: JSON.stringify({"text": this.state.post})
//       })
//       // Sends an alert message if the user has entered the correct details matching to a user 
//       // ID and then user is logged in
//     .then((response) => {
//         if(response.status === 200){
//             //return response.json()
//             console.log("Post has been successfully deleted");
//             this.getData();
//         }else if(response.status === 400){
//             console.log("Error: Could not delete post")
//         }else{
//             throw 'Something went wrong';
//         }
//     }) 
//       .catch((error) => {
//         console.log(error);
//       })
//   }

//   updatePost = async (post_id) => {
//     const id = await AsyncStorage.getItem('@session_id');
//     const token = await AsyncStorage.getItem('@session_token');
//     return fetch("http://localhost:3333/api/1.0.0/user/"+ id + "/post/" + post_id, {    
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Authorization': token
//         },
//         method: 'PATCH',// Uses the POST method as the user wants to log in
//         body: JSON.stringify({"text": this.state.post2})
//       })
//       // Sends an alert message if the user has entered the correct details matching to a user 
//       // ID and then user is logged in
//     .then((response) => {
//         if(response.status === 200){
//             //return response.json()
//             console.log("Post has been successfully updated");
//             this.getData();
//         }else if(response.status === 400){
//             console.log("Error: Could not update post");
//         }else{
//             throw 'Something went wrong';
//         }
//     }) 
//       .catch((error) => {
//         console.log(error);
//       })
//   }

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
          <Text style={styles.name}> VIEW FRIENDS ACCOUNTS </Text> 

        <TextInput placeholder='Enter Username to find friends you have added:' style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
        marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}
        value={this.state.search_friends} onChangeText={value => this.setState({search_friends: value})}/>

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
      <Text style={{marginTop: 60}} onPress={() => this.props.navigation.navigate('Friends Wall')}> View Posts </Text>
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
name : {
  color: '#033329',
  fontSize: 26, 
  marginTop: 100,
  fontWeight: 'bold',
  textAlign: 'center',
},
message: {
  color: '#FFFFFF',
  fontSize: 28, 
  marginTop: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 19, 
  backgroundColor: '#0e8269',
  width: 350, 
  height: 70,
  borderWidth: 4,  
  borderColor: '#e3e327',
  marginLeft: 40,
  fontStyle: 'italic',
},
post: {
  fontSize: 26,
  color: '#FFFFFF',
  backgroundColor: '#81CD2A',
  width: 160,
  height: 50, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 135,
  marginTop: 30,
  textAlign: 'center'
  },
logOutButton: {
  fontSize: 16,
  color: '#FFFFFF',
  backgroundColor: '#08fc00',
  width: 90,
  height: 30, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft: 320,
  marginTop: -100,
  textAlign: 'center',
  justifyContent: 'center',
},
editPostButton : {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: '#25e849',
  width: 120,
  height: 40, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 40,
  marginTop: 30,
  textAlign: 'center'
},
deletePostButton: {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: 'red',
  width: 150,
  height: 60, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 240,
  marginTop: -40,
  textAlign: 'center',
},
likePostButton: {
  fontSize: 20,
  color: '#10c90a',
  backgroundColor: 'yellow',
  width: 120,
  height: 40, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 40,
  marginTop: -10,
  textAlign: 'center',
},
removePostLikeButton: {
  fontSize: 20,
  color: 'yellow',
  backgroundColor: 'red',
  width: 160,
  height: 40, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 240,
  marginTop: -50,
  textAlign: 'center',
},

});

export default FriendsWall;