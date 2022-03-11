import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// Imports and accesses the details stored within the async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogOut extends Component{
constructor(props){
    super(props);

    this.state = {
        token: '', 
        // The property that must exist for the user to log out, a uniquely generated token when the user 
        // logs in
    }
}

componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // Checks if the user is logged in to reach the log out page
        this.checkLoggedIn();
    });        
}

componentWillUnmount(){
    this._unsubscribe();
}

checkLoggedIn = async () => {
    // This function tries to obtain the session token from async storage generated when the user logs into their account
    const value = await AsyncStorage.getItem('@session_token');
    if(value !== null) { 
        // if the value exists the user can continue with all the processes then can choose on the log out page...
        this.setState({token:value});
    }else{
        //however, if the users token does not exist they'll be automatically navigated to the log in page.
        this.props.navigation.navigate("Log In");
    }
}

// Log out function
logout = async () => {
    // Collects the token from async storage
    const token = await AsyncStorage.getItem('@session_token');
    // Removes the session token from async storage, if the user logs out
    await AsyncStorage.removeItem('@session_token');
    // The API request for the user to log out
    return fetch("http://localhost:3333/api/1.0.0/logout", {
        method: 'POST',
        headers: {
            "X-Authorization": token // checks to see if the log in token exists
        }
    })
    // If the user is logged out they will be successfully sent to the the Log In page as their session has been 
    // timed out else, if the user cannot be logged out they will remain on the log out page
    .then((response) => {
        if(response.status === 200){
            this.props.navigation.navigate("Log In");
        }else if(response.status === 401){
            this.props.navigation.navigate("Log Out");
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
            {/* The title of the page */}
            <Text style={styles.logOutTitle}> USER ACCOUNT LOG OUT </Text>
            {/* A button which allows access to the log out function, here the log out function will be used 
                so, the user session is timed out and the user is successfully logged out */}
            <TouchableOpacity>
                <Text style={styles.logOutMessage} onPress={() => this.logout()}> 
                Click Here, to continue logging out!
                </Text>
            </TouchableOpacity>
            {/* A button which navigates the user back to their main feed screen, a way to return to the application 
                if the user clicks the log out button accidentally */}
            <TouchableOpacity>
                <Text style={styles.logOutMessage1} onPress={() => this.props.navigation.navigate("Main")}> 
                Click Here, to return to your account!
                </Text>
            </TouchableOpacity>
            </ScrollView>
        )
    }
}

// A StyleSheet is declared to format the components
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
