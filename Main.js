import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

class Main extends Component {
  constructor(props){
    super(props);
    // Sets the state of the properties that will be entered by the user for posting details
    this.state = {
      isLoading: true,
      postData: [],
      post: '',
      post_id: '',
      post2: '',
      text: '',
      photo: null, 
      first_name : '',
      last_name : '',
    }
  }
  
componentDidMount() {
  this.unsubscribe = this.props.navigation.addListener('focus', () => {
    this.checkLoggedIn();
    this.getData();
    // Ensures the image taken on the profile edit page is automatically uploaded onto the main page whether or not 
    // the user logs in and out
    this.post_profile_image();
  });
}

componentWillUnmount() {
  this.unsubscribe();
}

getData = async () => {
  // The session id and token is also collected to ensure the user is performing this action when logged in
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@session_id');
  // The API request that is sent to get and display all the posts made by a user
  return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post", {
    headers: {
      'X-Authorization':  token
    },
    method: 'GET'
  })
  .then((response) => {
    // If the posts are found then, they can be displayed successfully
    if(response.status === 200){
      return response.json()
    // Else, if the user has no posts then, they will be sent to the log in pages
    }else if(response.status === 401){
      this.props.navigation.navigate("Log In");
    }else{
      throw 'Something went wrong';
      }
  })
  .then((responseJson) => {
    this.setState({
      isLoading: false,
      // Loads the respose from the post data as this is where the post data is stored
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

// A function that is used to make a new post
addPost = async () => {
  // The session token and id are taken from the storage to ensure the user that is logged in can post on their own wall
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  // The API request that is sent from the logged in user to make a post on the server
  return fetch("http://localhost:3333/api/1.0.0/user/"+ id+ "/post", {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',
    // The text that will be entered into the body of the post
    body: JSON.stringify({"text": this.state.post})
  })
  .then((response) => {
    // If post has been uploaded then a message will be displayed of the successful post
    if(response.status === 201){
      console.log("Post has been uploaded successful");
      this.getData();
      // Else, if the post has not uploaded then, an error message will be shown
    }else if(response.status === 400){
      console.log("Error: Could not upload post")
    }else{
      throw 'Something went wrong';
    }
})
  .catch((error) => {
    console.log(error);
  })
}

// A function that is used to make a remove a post made by the user on their own profile
removePost = async (post_id) => {
  // The session token and id are taken from the storage to ensure the user that is logged in can post on their own wall
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  // The API request sent to the server to delete the post, here the post_id will be collected to ensure the correct
  // post is deleted
  return fetch("http://localhost:3333/api/1.0.0/user/"+ id+ "/post/" + post_id, {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'DELETE',
  })
  .then((response) => {
    // If the post is deleted, then a message will be shown that the post has been deleted succcessfully
    if(response.status === 200){
      console.log("Post has been successfully deleted");
      this.getData();
      //Else, if the post has not been deleted then, an error message will be shown
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

// A function that is used to make a update an existing post on the users profile
updatePost = async (post_id) => {
  // The session token and id are taken from the storage to ensure the user that is logged in can post on their own wall
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  // The API request that is sent to the server with post id to ensure the correct post has been updated
  return fetch("http://localhost:3333/api/1.0.0/user/"+ id + "/post/" + post_id, {    
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'PATCH',
    // The text entered intot the post body by the user to make the update
    body: JSON.stringify({"text": this.state.post2})
    })
  .then((response) => {
    // If the post has been uploaded then, a successful message will be shown
    if(response.status === 200){
      console.log("Post has been successfully updated");
      this.
      getData();
      // Else, if the post has not been updated then, an error message will be sent
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

// A function to get the image taken by the user
post_profile_image = async() => {
  // The session token and id are taken from the storage to ensure the user that is logged in can post on their own wall 
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  // The API request sent to the server to take  the photo taken by the user from the camera page and to be stored on the main page
  fetch("http://localhost:3333/api/1.0.0/user/"+id+"/photo", {
    method: 'GET',
    headers: {
      'X-Authorization': token
    }
  })
  .then((res) => {
    return res.blob();
  })
  .then((resBlob) => {
    let data = URL.createObjectURL(resBlob);
    this.setState({
      photo: data,
      isLoading: false
    });
  })
  .catch((error) => {
    console.log(error);
  });
};
       
 

render() {
  if (this.state.isLoading){
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center',alignItems: 'center',
          height: 200, width: 100,}}>
      </View>
      );
    }else{
      return (
        <View style={styles.body}>
        <ScrollView>
          {/* The title of the page */}
        <Text style={styles.name}> WELCOME </Text> 
        {/* The log out button that is linked to the log out page via the stack navigation */}
        <TouchableOpacity>  
          <Text style={styles.logOutButton} onPress={() => this.props.navigation.navigate('Log Out')}> LOG OUT </Text>
        </TouchableOpacity>

        {/* A subtitle of the page for further user guidance */}
        <Text style={styles.message}> What's your mind? You can share a post now with your friends! </Text> 

        {/* An image that will be shown for the users profile photo taken on the camera page */}
        <Image source={{uri: this.state.photo}}
          style={{width: 100, height: 100, marginLeft:40,borderWidth: 3, borderColor: '#e3e327', marginTop: 20 }}/>

        {/* A text input box that is used to type in text that will be used to make a post by the user */}
        <TextInput placeholder='Enter Your Post:' style={{fontSize: 24, backgroundColor: '#b8c427', width: 350, height: 60, marginLeft: 40, 
          marginTop: 45, borderWidth: 4, borderColor: '#FFFFFF'}}
          value={this.state.post} onChangeText={value => this.setState({post: value})}/>

        {/* A button linked with the new post function, that will take the entered text value within the input box and then, post it 
        onto the server */}
        <TouchableOpacity> 
          <Text onPress={() => this.addPost()} style={styles.post} > POST NOW </Text>
        </TouchableOpacity>

        {/* A flatlist that reads the post data to display the text that has been sent to create a new post */}
        <FlatList
          data = {this.state.postData}
          renderItem={({item}) => (
          <View>
            <Text style={{height:100, width:300,backgroundColor: '#dfeb4d', color: 'black', textAlign: 'center', marginTop: 50, 
              marginLeft: 65, fontSize: 18}}> Post: {item.text}
          </Text>
        
        {/* A text input box that is used to entered a new text value to be sent to the server so, that the user post can be updated */}
        <TextInput placeholder='Edit Post:' style={{fontSize: 30, backgroundColor: '#e4ed79', width: 350, height: 40, marginLeft: 40, 
          marginTop: 30, borderWidth: 4, borderColor: '#FFFFFF'}}
          value={this.state.post2} onChangeText={value => this.setState({post2: value})}/>

        {/* A button that is linked to the update post function, this will take the entered text value in the input box
        and make an update to the post */}
        <TouchableOpacity> 
          <Text onPress={() => this.updatePost(item.post_id)} style={styles.editPostButton} > EDIT POST </Text>
        </TouchableOpacity>
        {/* A button that is linked to the remove post function, this will find the correct post id of the post we 
        would like to remove and delete it */}
        <TouchableOpacity> 
          <Text onPress={() => this.removePost(item.post_id)} style={styles.deletePostButton} > DELETE POST </Text>
        </TouchableOpacity>
        </View>
        )}
          keyExtractor={(item,index) => item.post_id.toString()}/> 
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
name: {
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
});

export default Main;