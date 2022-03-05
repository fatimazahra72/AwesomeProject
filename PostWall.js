import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

class PostWall extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      postData : [],
      text : '',
      post: '',
      post2: '',
      post_id: '',
      id: '',
      user_id: '',
      email:'',
      photo: null,
    }
  }
  
componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
    this.get_friend_profile_picture();
  });
  this.getData();
}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'GET',// Uses the POST method as the user wants to log in
  })
  .then((response) => {
    if(response.status === 200){
      return response.json()
    }else if(response.status === 401){
      console.log("Error: Could not update post");
    }else{
      throw 'Something went wrong';
    }
})
  .then((responseJson) => {
    this.setState({
      isLoading: false,
      postData: responseJson
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


likePost = async (post_id) => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post/" + post_id + "/like" , {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',
  })
  .then((response) => {
    if(response.status === 200){
      console.log("You have liked the post");
      this.getData();
    }else if(response.status === 401){
      console.log("Error: Could not like the post");
    }else{
      throw 'Something went wrong';
    }
}) 
  .catch((error) => {
    console.log(error);
  })
}

removePostLike = async (post_id) => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post/" + post_id + "/like", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'DELETE',
  })
  .then((response) => {
    if(response.status === 200){
      console.log("You have removed a like from the post");
      this.getData();
    }else if(response.status === 401){
      console.log("Error: Could not remove the like from the post");
    }else{
      throw 'Something went wrong';
    }
}) 
  .catch((error) => {
    console.log(error);
  })
}

addPostOnFriendsWall = async () => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',// Uses the POST method as the user wants to log in
    body: JSON.stringify({"text": this.state.post})
  })
  .then((response) => {
    if(response.status === 201){
      console.log("Post has been uploaded successful");
      this.getData();
    }else if(response.status === 400){
      console.log("Error: Could not upload post")
    }else{
      throw 'Something went wrong';
    }
})
  .catch((error) => {
    console.log(error);
    this.getData();
  })
}

updatePostOnFriendsWall = async (post_id) => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post/" + post_id, {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'PATCH',// Uses the POST method as the user wants to log in
    body: JSON.stringify({"text": this.state.post2})
  })
  .then((response) => {
    if(response.status === 200){
      console.log("Post has been successfully updated");
      this.getData();
    }else if(response.status === 400){
      console.log("Error: Could not update post");
    }else{
      throw 'Something went wrong';
    }
}) 
  .catch((error) => {
    console.log(error);
  })
}

removePostOnFriendsWall = async (post_id) => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id+ "/post/" + post_id, {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'DELETE',
  })
  .then((response) => {
    if(response.status === 200){
      console.log("Post has been successfully deleted");
      this.getData();
    }else if(response.status === 400){
      console.log("Error: Could not delete post")
    }else{
      throw 'Something went wrong';
  }
}) 
  .catch((error) => {
    console.log(error);
  })
}

get_friend_profile_picture = async() => {
  let {user_id} = this.props.route.params;
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
    method: 'GET',
    headers: {
      'X-Authorization': token,
    },
  })
  .then((res) => {
    return res.blob();
  })
  .then((resBlob) => {
    let data = URL.createObjectURL(resBlob);
    this.setState({
      photo: data,
      isLoading: false,
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
};


render() {
    return (
      <ScrollView>
      <View style={styles.body}>
      <Text style={styles.title}> View Friends Post </Text> 
      <Text style={styles.message}> Share Posts with your Friends </Text> 

      <Image source={{uri: this.state.photo,}}
        style={{width: 70, height: 70, marginLeft:40,borderWidth: 3, borderColor: '#e3e327', marginTop: 20 }}/>

      <FlatList
        data = {this.state.postData}
        renderItem={({item}) => (
      <View>
      <Text style={{height:90, width: 260, backgroundColor: '#858713', color: 'black', marginTop: 70, marginLeft: 75, fontSize: 23}}> 
        Post: {item.text}
      </Text>
      
      <TouchableOpacity> 
        <Text onPress={() => this.likePost(item.post_id)}  style={styles.likePostButton} > Like Post </Text>
      </TouchableOpacity>
      
      <TouchableOpacity> 
        <Text onPress={() => this.removePostLike(item.post_id)} style={styles.removeLikeButton} > Remove Like </Text>
      </TouchableOpacity>

      <TextInput placeholder='Enter Your Post:' style={{fontSize: 24, backgroundColor: '#b8c427', width: 350, height: 60, marginLeft: 40, 
        marginTop: 45, borderWidth: 4, borderColor: '#FFFFFF'}}
        value={this.state.post} onChangeText={value => this.setState({post: value})}/>

      <TouchableOpacity> 
        <Text onPress={() => this.addPostOnFriendsWall()} style={styles.addPost}> Post on Your Friend's Wall </Text>
      </TouchableOpacity>
      
      <TextInput placeholder='Enter Your Updated Post:' style={{fontSize: 24, backgroundColor: '#b8c427', width: 350, height: 60, marginLeft: 40, 
        marginTop: 45, borderWidth: 4, borderColor: '#FFFFFF'}}
        value={this.state.post2} onChangeText={value => this.setState({post2: value})}/>

      <TouchableOpacity> 
        <Text onPress={() => this.updatePostOnFriendsWall(item.post_id)} style={styles.updatePost}> Update Post on Friend's Page </Text>
      </TouchableOpacity>

      <TouchableOpacity> 
        <Text onPress={() => this.removePostOnFriendsWall(item.post_id)} style={styles.removePost}> Remove Post on Friend's Page </Text>
      </TouchableOpacity>

      </View>
        )} 
        keyExtractor={(item,index) => item.post_id.toString()}/> 
      </View>
      </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  body: {
  backgroundColor: '#60BEB0',
  flex:  1,
  display: 'flex',
},
message: {
  color: '#FFFFFF',
  fontSize: 34, 
  marginTop: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 19, 
  backgroundColor: '#0e8269',
  width: 350, 
  height: 40,
  borderWidth: 4,  
  borderColor: '#e3e327',
  marginLeft: 40,
  fontStyle: 'italic',
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
  height: 40,
  borderRadius: 10,
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
  marginTop: 20,
  textAlign: 'center',
},
removeLikeButton: {
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
addPost: {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: '#81CD2A',
  width: 270,
  height: 45, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 85,
  marginTop: 30,
  textAlign: 'center'
},
updatePost: {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: '#0c6957',
  width: 270,
  height: 70, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 85,
  marginTop: 30,
  textAlign: 'center'
},
removePost: {
  fontSize: 20,
  color: '#FFFFFF',
  backgroundColor: 'red',
  width: 270,
  height: 70, 
  fontWeight: 'bold',
  borderWidth:  4,  
  borderColor:  '#e3e327',
  marginLeft: 85,
  marginTop: 30,
  textAlign: 'center'
},
});

export default PostWall;