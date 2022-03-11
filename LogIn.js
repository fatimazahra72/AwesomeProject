import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';
// Imports the image used for the social media logo from the assets folder
import logo from './assets/logo.png';

class LogIn extends Component {
constructor(props){
  super(props);

  // Sets the state of the fields that will be entered by the user for logging into their account
  this.state = {
  isLoading: true,
  newUser: [],
  id : '',
  email : '',
  password : ''
  };
}

// A log in function that is sent to the API when the user wants to log in
logInAccount = async () => {
  // This code fetches the API reuqest which will allow the user to log into their account - 
  // the details will be collected from the server from when the account was registered   
  return fetch("http://localhost:3333/api/1.0.0/login",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state) // Adds the entered log in details into the body
  }) 
  // Sends an alert message the session id and the uniquely generated token to the user upon successful log in, 
  // sends a message if the log in details are incorrect or invalid
  .then((response) => {
    if(response.status === 200){
      return response.json()
    }else if(response.status === 400){
      throw 'Invalid email or password';
    }else{
      throw 'Something went wrong';
    }
})
.then(async (responseJson) => {
  console.log(responseJson);
  // Sets the session id and the generated token id from the log in page and then, stores them into async storage so they're accessible 
  // as long as the user is logged in and using their account
  await AsyncStorage.setItem('@session_id', responseJson.id);
  await AsyncStorage.setItem('@session_token', responseJson.token);
  // Once the session id and token are obtained, the user will be navigated to the main page of the application
  this.props.navigation.navigate("Main");
})
.catch((error) => {
  console.log(error);
  })
}

  render() {
    return (
    <View style={styles.body}>

      <Text style={styles.name}> Spacebook </Text>
      {/* Adds the image logo */}
      <img src={logo} style={{width: 40, height: 40, marginTop: -10, marginLeft: 365}}/>  

      { /* Sets the title of the page */ }
      <Text style={styles.title}> Account Log In </Text>

      {/* Sets the title for the email address details and the input box to obtain the entered email address results
       to check entered value exists on the server */}
      <Text style={styles.title1}> EMAIL ADDRESS: </Text>
      <TextInput placeholder='Enter Email:' style={{fontSize: 22, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
        marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
        onChangeText={value => this.setState({email: value})}
        value={this.state.email}/>

      {/* Sets the title for the password details and the input box to obtain the entered password
        to check if the password with the entered email address exists on the server */}
      <Text style={styles.title2}> PASSWORD: </Text>
      <TextInput placeholder='Enter Password:' style={{fontSize: 22, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40,
        marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}} 
        secureTextEntry={true} onChangeText={value => this.setState({password: value})}
        value={this.state.password}/>

      {/* Sets the button for the log in action, the logInAccount function is used to check if the entered account 
       details are correct and if the details are correct then a user will be logged as the account exists
       on the server, providing the user with a log with a unique token */}
      <TouchableOpacity> 
        <Text onPress={() => this.logInAccount()} style={styles.logInButton} > LOG IN </Text>
      </TouchableOpacity>
    </View>
    );
  }
}

// A StyleSheet is declared to format the components
const styles = StyleSheet.create({
body : {
    backgroundColor: '#60BEB0',
    flex:  1,
    display: 'flex',
},
name : {
  color: '#FFFFFF',
  fontSize: 20, 
  marginLeft: 290, 
  marginTop: 50,
  fontWeight: 'bold',
},
title : {
  width: 270, 
  height: 70,
  color: '#FFFFFF', 
  fontSize: 34, 
  marginLeft: 80,
  marginTop: 130,
  fontWeight: 'bold',
  justifyContent : 'center',
  textAlign : 'center',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  backgroundColor: '#30524D',
},
title1 : {
  color: '#FFFFFF',
  fontSize: 23, 
  marginLeft: 37, 
  marginTop: 30, 
  fontWeight: 'bold',
},
title2 : {
  color: '#FFFFFF', 
  fontSize: 23,
  marginLeft: 37, 
  marginTop: 10, 
  fontWeight: 'bold',
}, 
logInButton : {
  fontSize : 32,
  color : '#FFFFFF',
  backgroundColor : '#81CD2A',
  width : 140,
  height : 60, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft : 135,
  marginTop : 30,
  textAlign : 'center',
},
});

export default LogIn;



