import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// Calls an image to be used from the assets folder 
import logo from './assets/logo.png';

class Home extends Component {
  render() {
    return (
      <View style={styles.body}>
      <img src={logo} style={{width: 80, height: 80, marginTop: 40, marginLeft: 270}}/>  
      {/* The title for the page */}
      <Text style={styles.name}> WELCOME TO SPACEBOOK </Text>  
        {/* Sets a button with the touch opacity, which allows the user to navigate to the Sign Up page to register a
        user account or the Log In page if a user account it has already been created */}       
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
},
name : {
  color: '#FFFFFF',
  fontSize: 20, 
  marginLeft: 80, 
  marginTop: 60,
  fontWeight: 'bold',
},
logInAccess : {
  width: 270, 
  height: 50,
  color: '#FFFFFF', 
  fontSize: 27, 
  marginLeft: 75,
  marginTop: 90,
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
  borderRadius: 100,
  fontWeight: 'bold',
  justifyContent : 'center',
  textAlign : 'center',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  backgroundColor: '#30524D',
},
});
  
  export default Home