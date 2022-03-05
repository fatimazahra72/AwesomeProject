import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProfileEdit extends Component {
constructor(props){
    super(props);
    this.state = {
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

updateFirstName = async() => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');

    let to_Send = {};       
        if(this.state.first_name !=this.state.updated_first_name){
            to_Send['first_name'] = this.state.first_name;
    }
    return fetch("http://localhost:3333/api/1.0.0/user/" + id,{ 
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':  token
        }, 
        body: JSON.stringify(to_Send) //stings the values in
    })

    .then((response)=>{
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
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

updateLastName = async() => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');
    let to_Send = {};
    if(this.state.last_name !=this.state.updated_last_name){
        to_Send['last_name'] = this.state.last_name;
    }

    return fetch("http://localhost:3333/api/1.0.0/user/" + id,{ 
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':  token
        }, 
        body: JSON.stringify(to_Send) //stings the values in
    })

    .then((response)=>{
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
        }else if(response.status === 401){
            throw "Invalid: Last Name has already been used"
        }else{
            throw "Something went wrong"
         }  
    }).catch((error)=>{
        console.log(error);
    })
}

updateEmail = async() => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');
    let to_Send = {};       
        if(this.state.email !=this.state.updated_email){
        to_Send['email'] = this.state.email;
    }

    return fetch("http://localhost:3333/api/1.0.0/user/" + id,{ 
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':  token
        }, 
        body: JSON.stringify(to_Send) //stings the values in
    })
    .then((response)=>{
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
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
        <Text style={styles.title}> UPDATE YOUR ACCOUNT CREDENTIALS WHENEVER YOU WISH </Text> 

        <TextInput placeholder='Enter Updated First Name' 
            style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
            marginTop: 20, borderWidth: 4, borderColor: '#FFFFFF'}}
            onChangeText={value => this.setState({first_name:value})}
            value={this.state.first_name} />

        <TouchableOpacity>
            <Text onPress={()=> this.updateFirstName()} style={styles.firstNameButton}> Update First Name </Text>
        </TouchableOpacity>

        <TextInput placeholder='Enter Updated Last Name' 
            style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
            marginTop: 20, borderWidth: 4, borderColor: '#FFFFFF'}}
            onChangeText={value => this.setState({last_name:value})}
            value={this.state.last_name} />

        <TouchableOpacity>
            <Text onPress={()=> this.updateLastName()} style={styles.lastNameButton}> Update Last Name </Text>
        </TouchableOpacity>

        <TextInput placeholder='Enter new Email Address' 
            style={{fontSize: 22, backgroundColor: '#b8c427', width: 350, height: 40, marginLeft: 40, 
            marginTop: 20, borderWidth: 4, borderColor: '#FFFFFF'}}
            onChangeText={value => this.setState({email:value})}
            value={this.state.email} />

        <TouchableOpacity>
            <Text onPress={()=> this.updateEmail()} style={styles.emailButton}> Update Email Address </Text>
        </TouchableOpacity>

        <TouchableOpacity> 
          <Text style={styles.camera} onPress={() => this.props.navigation.navigate('Camera')}> Click to Upload a New Profile Picture </Text>
        </TouchableOpacity>
        </ScrollView>
        </View>
        )
    }
}

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

