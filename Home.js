import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import LogIn from './LogIn';
import SignUp from './SignUp';

class Home extends Component {
    render() {
      return (
      <View style={styles.body}>

        <Text style={styles.name}> WELCOME TO SPACEBOOK </Text>
         {/* The title for the page - add the background style to view */}
  
        {/* Sets a button with the touch opacity, this button performs an action with the signUpAccount function and collects
        data from the input fields to register the user account on the server and return an authentication id*/}       
        <TouchableOpacity> 
          <Text style={styles.logInAccess} onPress={() => this.props.navigation.navigate('Log In')}> LOG IN </Text>
        </TouchableOpacity>
        <TouchableOpacity> 
          <Text style={styles.signUpAccess} onPress={() => this.props.navigation.navigate('Sign Up')}> CREATE A NEW ACCOUNT </Text>
        </TouchableOpacity>
      </View>
      );
    }
  }
  
  // A StyleSheet is declared to format the components above such as titles and buttons
  const styles = StyleSheet.create({
    body : {
        backgroundColor: '#60BEB0',
        flex: 1,
       // display: flex,
   },
  name : {
    color: '#FFFFFF',
    fontSize: 20, 
    marginLeft: 80, 
    marginTop: 220,
    fontWeight: 'bold',
  },
  logInAccess : {
    width: 270, 
    height: 50,
    color: '#FFFFFF', 
    fontSize: 27, 
    marginLeft: 75,
    marginTop: 100,
    borderRadius: 30,
    fontWeight: 'bold',
    justifyContent : 'center',
    textAlign : 'center',
    borderWidth:  3,  
    borderColor:  '#e3e327',
    backgroundColor: '#30524D',
  },
  signUpAccess : {
    width: 270, 
    height: 70,
    color: '#FFFFFF', 
    fontSize: 22, 
    marginLeft: 75,
    marginTop: 50,
    borderRadius: 30,
    fontWeight: 'bold',
    justifyContent : 'center',
    textAlign : 'center',
    borderWidth:  3,  
    borderColor:  '#e3e327',
    backgroundColor: '#30524D',
  },
  });
  
  export default Home