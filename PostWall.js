import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

class PostWall extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Sets the state of the properties that will be entered by the user for post 
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

// A function that is used to get the posts of the users friends 
getData = async () => {
  // Gets the user id of the friend
  let {user_id} = this.props.route.params;
  const id = await AsyncStorage.getItem('@session_id');
  // Collects the session token for the user when logged in from async storage
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'GET',// Uses the POST method as the user wants to log in
  })
  .then((response) => {
    // If the posts of that user are shown then, it will return the requested data
    if(response.status === 200){
      return response.json()
      // Else, if the users posts cannot be loaded then, an error message will be shown
    }else if(response.status === 401){
      console.log("Error: Could not update post");
    }else{
      throw 'Something went wrong';
    }
})
  .then((responseJson) => {
    this.setState({
      isLoading: false,
      // Loads the post data
      postData: responseJson,
      id : id
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

// A function that is used to like a users post
likePost = async (post_id) => {
  // Collects the ID of the user whoms post the user can like
  let {user_id} = this.props.route.params;
  // Gets the session token for the user from async storage
  const token = await AsyncStorage.getItem('@session_token');
  // The API request that is sent to the server for the logged in user to like a post of their friends page
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post/" + post_id + "/like" , {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',
  })
  .then((response) => {
    // If the post has been liked then, a message will be shown that the post has been liked successfully
    if(response.status === 200){
      console.log("You have liked the post");
      this.getData();
      // Else, if the like cannot be made then, an error message will be shown
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

// A function that is used to remove a like on a post
removePostLike = async (post_id) => {
  // Collects the ID of the user whoms post the user can remove a like from
  let {user_id} = this.props.route.params;
  // Gets the session token for the user from async storage
  const token = await AsyncStorage.getItem('@session_token');
  // The API request that is sent to the server for the logged in user remove a like on their friends page
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id + "/post/" + post_id + "/like", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'DELETE',
  })
  .then((response) => {
    // If the post like has been removed then, a message will be shown that the like has been removed successfully
    if(response.status === 200){
      console.log("You have removed a like from the post");
      this.getData();
    // Else, if the like cannot be removed then, an error message will be shown
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

// A function that is used to allow a user to upload a post on their friends wall
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

// A function that is used to allow a user to update an existing post that they uploaded on their friends wall
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

// A function that allows a user to remove/delete a post they made on their friends wall
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

// A function that is used too get the profile pictures of a friend that the logged in user is viewing
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




renderingPost(item){
// The if statement is used to check if the user id is not the same as the id of the user who is logged in, to avoid errors such as a user
// liking their own post instead of their friends posts
  if(item.author.user_id==this.state.id){
    return(
       <ScrollView>
         <View>
      {/* A text input box that used to allow the user to enter a new text value to update an existing post made on their friends wall */}
      <TextInput placeholder='Enter Your Updated Post:' style={{fontSize: 24, backgroundColor: '#b8c427', width: 350, height: 60, marginLeft: 40, 
        marginTop: 45, borderWidth: 4, borderColor: '#FFFFFF'}}
        value={this.state.post2} onChangeText={value => this.setState({post2: value})}/>
      {/* A button that works with the update post function, that sends the new text value from the input box to be updated onto the post */}
      <TouchableOpacity> 
        <Text onPress={() => this.updatePostOnFriendsWall(item.post_id)} style={styles.updatePost}> Update Post on Friend's Page </Text>
      </TouchableOpacity>
      {/* A button that works with the remove post function, that sends the user id and the post id to the server to remove the post */}
      <TouchableOpacity> 
        <Text onPress={() => this.removePostOnFriendsWall(item.post_id)} style={styles.removePost}> Remove Post on Friend's Page </Text>
      </TouchableOpacity>
      {/* Displays the text entered by the user on the specific post */}
      <Text style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 80, marginLeft: 40, 
          marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}> My Post: {item.text}</Text>
      </View>
      </ScrollView>
      );
    }
  else{
    return(
      <View>
        <Text style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 80, marginLeft: 40, 
          marginTop: 60, borderWidth: 4, borderColor: '#FFFFFF'}}>{item.text}</Text>
      {/* A button that works with the like post function to like a friends post */}
      <TouchableOpacity> 
        <Text onPress={() => this.likePost(item.post_id)}  style={styles.likePostButton} > Like Post </Text>
      </TouchableOpacity>
      {/* A button that works with the remove like function to remove a like on a friends post */}
      <TouchableOpacity> 
        <Text onPress={() => this.removePostLike(item.post_id)} style={styles.removeLikeButton} > Remove Like </Text>
      </TouchableOpacity>
      </View>
     ); 
   }

}

render() {
 
    return (
      <ScrollView>
      <View style={styles.body}>
      {/* The page title */}
      <Text style={styles.title}> View Friends Post </Text> 
      {/* Page subtitle for better user guidance */}
      <Text style={styles.message}> Share Posts with your Friends </Text> 

      {/* The image where the users friends profile picture will be shown on the friends wall */}
      <Image source={{uri: this.state.photo,}}
        style={{width: 70, height: 70, marginLeft:40,borderWidth: 3, borderColor: '#e3e327', marginTop: 20 }}/>

      {/* A text input box where the user can enter new text value to be uploaded a post */}
      <TextInput placeholder='Enter Your Post:' style={{fontSize: 24, backgroundColor: '#b8c427', width: 350, height: 60, marginLeft: 40, 
        marginTop: 45, borderWidth: 4, borderColor: '#FFFFFF'}}
        value={this.state.post} onChangeText={value => this.setState({post: value})}/>
      {/* A button that works with the add post function to make a post from the value the user enters into the text input */}
      <TouchableOpacity> 
        <Text onPress={() => this.addPostOnFriendsWall()} style={styles.addPost}> Post on Your Friend's Wall </Text>
      </TouchableOpacity>
      {/* A flatlist that searches through and read the data stored within the post array */}
      <FlatList
        data = {this.state.postData}
        renderItem={({item}) => (
          this.renderingPost(item)
        )} 
        keyExtractor={(item,index) => item.post_id.toString()}
        /> 
      </View>
      </ScrollView>
      );
    }
  }
// A StyleSheet is declared to format the components
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