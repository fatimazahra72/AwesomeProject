import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// Imports the async storage, where account data can be stored e.g., session id and token
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProfileEdit extends Component {
constructor(props){
    super(props);
    this.state = {
        // Sets the state of all the properties and values that will be added as imputs or changed by the user 
        isLoading: true, 
        id: '',
        email:'',
        first_name: '',
        last_name: '',
        password: '',
        updated_first_name:'',
        updated_last_name:'',
        updated_email:'',
    };
}

// This function is used to update the user first name
updateFirstName = async() => {
    // The session id and token are taken from async storage to ensure the user is logged in
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');

    // This variable performs a function to check if the current first name of the user is not equivalent to the 
    // updated first name that the user has chosen, if it is not the same then, the new name will be sent to the server 
    // through the API request
    let to_Send = {};       
        if(this.state.first_name !=this.state.updated_first_name){
            to_Send['first_name'] = this.state.first_name;
    }
    // The API request sent by the user to change their account details
    return fetch("http://localhost:3333/api/1.0.0/user/" + id,{ 
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':  token
        }, 
        body: JSON.stringify(to_Send) //Implemented the value added to the to_send variable into the body
    })
    // If the user details have been changed successfully, then the user will be navigated to the login page to sign in again
    .then((response)=>{
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
            // If the user enters the same first name as the current one then, an error message will be shown
        }else if(response.status === 401){
            throw "Invalid: First name has already been used"
        }else{
            throw "Something went wrong"
        }  
    })
    .catch((error)=>{
    console.log(error);
    })
}

// This function is used to update the user last name
updateLastName = async() => {
    // The session id and token are taken from async storage to ensure the user is logged in
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');

    // This variable performs a function to check if the current last name of the user is not equivalent to the 
    // updated last name that the user has chosen, if it is not the same then, the new name will be sent to the server 
    // through the API request
    let to_Send = {};
    if(this.state.last_name !=this.state.updated_last_name){
        to_Send['last_name'] = this.state.last_name;
    }
    // The API request sent by the user to change their account details
    return fetch("http://localhost:3333/api/1.0.0/user/" + id,{ 
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':  token
        }, 
        body: JSON.stringify(to_Send) //Implemented the value added to the to_send variable into the body
    })
    // If the user surname has been changed successfully, then the user will be navigated to the login page to sign in again
    .then((response)=>{
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
        // If the user enters the same last name as the current one then, an error message will be shown
        }else if(response.status === 401){
            throw "Invalid: Last Name has already been used"
        }else{
            throw "Something went wrong"
         }  
    }).catch((error)=>{
        console.log(error);
    })
}

// This function is used to update the user email address 
updateEmail = async() => {
    // The session id and token are taken from async storage to ensure the user is logged in
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');

    // This variable performs a function to check if the current email address of the user is not equivalent to the 
    // updated email address name that the user has chosen, if it is not the same then, the new email address will be sent to the server 
    // through the API request
    let to_Send = {};       
        if(this.state.email !=this.state.updated_email){
        to_Send['email'] = this.state.email;
    }
    // The API request sent by the user to change their account details
    return fetch("http://localhost:3333/api/1.0.0/user/" + id,{ 
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':  token
        }, 
        body: JSON.stringify(to_Send) //Implemented the value added to the to_send variable into the body
    })
    .then((response)=>{
    // If the user email address has been changed successfully, then the user will be navigated to the login page to sign in again
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
        // If the user enters the same email address as the current one then, an error message will be shown
        }else if(response.status === 401){
            throw "Invalid: Email has already been used"
        }else{
            throw "Something went wrong"
        }  
    })
    .catch((error)=>{
        console.log(error);
    })
}

render(){
    return (
        <View style={styles.body}>
        <ScrollView>
        <Text style={styles.name}> SPACEBOOK </Text>
        {/* Displays the page title */}
        <Text style={styles.title}> UPDATE YOUR ACCOUNT CREDENTIALS WHENEVER YOU WISH </Text> 

        {/* Implements a text input box, where the user can enter their choice of a new first name */}
        <TextInput placeholder='Enter Updated First Name' 
            style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
            marginTop: 20, borderWidth: 4, borderColor: '#FFFFFF'}}
            onChangeText={value => this.setState({first_name:value})}
            value={this.state.first_name} />

        {/* The button is implemented with the update first name function, which allows the value entered by
        the user within the text input box to be saved as the new first name value on the server  */}
        <TouchableOpacity>
            <Text onPress={()=> this.updateFirstName()} style={styles.firstNameButton}> Update First Name </Text>
        </TouchableOpacity>

      {/* Implements a text input box, where the user can enter their choice of a new last name */}
        <TextInput placeholder='Enter Updated Last Name' 
            style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
            marginTop: 20, borderWidth: 4, borderColor: '#FFFFFF'}}
            onChangeText={value => this.setState({last_name:value})}
            value={this.state.last_name} />

        {/* The button is implemented with the update last name function, which allows the value entered by
        the user within the text input box to be saved as the new last name value on the server  */}
        <TouchableOpacity>
            <Text onPress={()=> this.updateLastName()} style={styles.lastNameButton}> Update Last Name </Text>
        </TouchableOpacity>

        {/* Implements a text input box, where the user can enter their choice of a new email address */}
        <TextInput placeholder='Enter new Email Address' 
            style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
            marginTop: 20, borderWidth: 4, borderColor: '#FFFFFF'}}
            onChangeText={value => this.setState({email:value})}
            value={this.state.email} />

        {/* The button is implemented with the update email function, which allows the value entered by
        the user within the text input box to be saved as the new email adddress value on the server  */}
        <TouchableOpacity>
            <Text onPress={()=> this.updateEmail()} style={styles.emailButton}> Update Email Address </Text>
        </TouchableOpacity>

        {/* Implements a button, where the user will be navigated to utilise the function on the camera page, 
        here the user will be allowed access to the camera to take a new picture, which will be sent to the
        server and updated on the main user profile page of the application */}
        <TouchableOpacity> 
          <Text style={styles.camera} onPress={() => this.props.navigation.navigate('Camera')}> Click to Upload a New Profile Picture </Text>
        </TouchableOpacity>
        </ScrollView>
        </View>
        )
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
    color: '#FFFFFF',
    fontSize: 20, 
    marginLeft: 290, 
    marginTop: 50,
    fontWeight: 'bold',
},
title: {
    color: '#a8a819',
    fontSize: 22, 
    marginTop: 35,
    marginLeft: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth:  3,  
    borderColor: '#e3e327',
    backgroundColor:  '#0e8269',
    width: 350,
    height: 100,
    borderRadius: 10,
},
firstNameButton: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#10c90a',
    width: 250,
    height: 40, 
    fontWeight: 'bold',
    borderWidth:  3,  
    borderColor:  '#e3e327',
    marginLeft: 90,
    marginTop: 20,
    textAlign: 'center',
    borderRadius: 30,
},
lastNameButton: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#10c90a',
    width: 250,
    height: 40, 
    fontWeight: 'bold',
    borderWidth:  3,  
    borderColor:  '#e3e327',
    marginLeft: 90,
    marginTop: 20,
    textAlign: 'center',
    borderRadius: 30,
},
emailButton: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#10c90a',
    width: 250,
    height: 40, 
    fontWeight: 'bold',
    borderWidth:  3,  
    borderColor:  '#e3e327',
    marginLeft: 90,
    marginTop: 20,
    textAlign: 'center',
    borderRadius: 30,
},  
camera: {
    fontSize: 20,
    color: '#a8a819',
    backgroundColor: '#045d5e',
    width: 250,
    height: 60, 
    fontWeight: 'bold',
    borderWidth:  3,  
    borderColor:  '#e3e327',
    marginLeft: 90,
    marginTop: 20,
    textAlign: 'center',
    borderRadius: 10,
}
});
export default ProfileEdit;

