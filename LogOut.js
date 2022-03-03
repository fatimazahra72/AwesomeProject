import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogIn from './LogIn';
import Main from './Main';

class LogOut extends Component{
constructor(props){
    super(props);

    this.state = {
        token: '',
    }
}

componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.checkLoggedIn();
    });        
}

componentWillUnmount(){
    this._unsubscribe();
}

checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value !== null) {
        this.setState({token:value});
    }else{
        this.props.navigation.navigate("Log In");
    }
}

logout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/logout", {
        method: 'POST',
        headers: {
            "X-Authorization": token
        }
    })
    .then((response) => {
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
        }else if(response.status === 401){
            this.props.navigation.navigate("Log In");
        }else{
            throw 'Something went wrong';
        }
    })
    .catch((error) => {
    console.log(error);
    })
}

    render(){
        return (
            <ScrollView style={styles.body}>
            <Text style={styles.logOutTitle}> USER ACCOUNT LOG OUT </Text>
            <TouchableOpacity>
                <Text style={styles.logOutMessage} onPress={() => this.logout()}> 
                Click Here, to continue logging out!
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.logOutMessage1} onPress={() => this.props.navigation.navigate("Main")}> 
                Click Here, to return to your account!
                </Text>
            </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
body : {
    backgroundColor: '#60BEB0',
    flex:  1,
    display: 'flex',
},
logOutTitle: {
    width: 210, 
    height: 140,
    color: '#FFFFFF', 
    fontSize: 34, 
    marginLeft: 110,
    marginTop: 130,
    fontWeight: 'bold',
    alignContent: 'center',
   // justifyContent : 'center',
    textAlign : 'center',
    borderWidth: 3,  
    borderColor: '#e3e327',
    backgroundColor: '#30524D',
},
logOutMessage: {
    fontSize: 22,
    color: '#FFFFFF',
    backgroundColor: '#81CD2A',
    width: 180,
    height: 100, 
    fontWeight: 'bold',
    borderWidth: 5,  
    borderColor: '#f5e505',
    marginLeft: 125,
    marginTop: 60,
    textAlign: 'center',
    justifyContent: 'center',
},
logOutMessage1 : {
    fontSize: 22,
    color: '#FFFFFF',
    backgroundColor: '#81CD2A',
    width: 180,
    height: 100, 
    fontWeight: 'bold',
    borderWidth: 5,  
    borderColor: '#e8a127',
    marginLeft: 125,
    marginTop: 80,
    textAlign: 'center',
    justifyContent: 'center',
},
});

export default LogOut;
