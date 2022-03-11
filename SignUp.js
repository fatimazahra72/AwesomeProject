import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';

class SignIn extends Component {
constructor(props){
super(props);

this.state = {
// Sets the state of the fields that will be entered by the user for registering e.g., 
// first name, last name, email address and password
isLoading: true,
newUser: [],
id : '',
first_name : '',
last_name : '',
email : '',
password : ''
};
}

signUpAccount = () => {
  //Validation here...

  let to_send = {
        first_name : this.state.first_name,
        last_name : this.state.last_name,
        email: this.state.email,
        password: this.state.password
      };
  return fetch("http://localhost:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
  })
  .then((response) => {
      if(response.status === 201){
          return response.json()
      }else if(response.status === 400){
          throw 'Failed validation';
      }else{
          throw 'Something went wrong';
      }
  })
  .then((responseJson) => {
         console.log("User created with ID: ", responseJson);
         this.props.navigation.navigate("Log In");
  })
  .catch((error) => {
      console.log(error);
  })
}
// signUpAccount = () => {
// // Obtains the state of the input fields and specifies it was the information that will be sent to 
// // the server for registration 
//   const to_send = {
//     first_name : this.state.first_name,
//     last_name : this.state.last_name,
//     email: this.state.email,
//     password: this.state.password
//   };
// // This code fetches the URL in which the user account must be registered
//   return fetch("http://localhost:3333/api/1.0.0/user",{
//     method: 'POST', // The POST method is used as a new account must be created
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(to_send)
//   }) // Displays an alert message when the account is registered with the correct data from input fields
//   .then((response) => {
//     if(response.status === 200){
//       return response.json()
//     }else if(response.status === 400){
//       console.log('Account not registered');
//     }else{
//       throw 'Something went wrong';
//   }
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// }
  
  render() {
    return (
      <View style={styles.body}> 
        <Text style={styles.name}> Spacebook </Text>
        <img src={logo} style={{width: 40, height: 40, marginTop: -10, marginLeft: 365}}/>  
       {/* The title for the page */}
        <Text style={styles.title3}> Create An Account </Text>

      {/* Sets the title for the first name and the input box to obtain the first name results to store on the server for user account details */}
        <Text style={styles.title4}> FIRST NAME: </Text>
        <TextInput placeholder='Enter First Name:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
          marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
          onChangeText={value => this.setState({first_name: value})}
          value={this.state.first_name}/>

      {/* Sets the title for the last name and the input box to obtain the last name results to store on the server for user account details */}
        <Text style={styles.title5}> LAST NAME: </Text>
        <TextInput placeholder='Enter Last Name:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
          marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
          onChangeText={value => this.setState({last_name: value})}
          value={this.state.last_name}/>

      {/* Sets the title for the email address and the input box to obtain the email address results to store on the server for user account details */}       
        <Text style={styles.title6}> EMAIL ADDRESS: </Text>
        <TextInput placeholder='Enter Email:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
          marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
          onChangeText={value => this.setState({email: value})}
          value={this.state.email}/>

      {/* Sets the title for the password and the input box to obtain the password results to store on the server for user account details */}       
        <Text style={styles.title7}> PASSWORD: </Text>
        <TextInput placeholder='Enter Password:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
          marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
          secureTextEntry={true} onChangeText={value => this.setState({password: value})}
          value={this.state.password}/>

      {/* Sets a button with the touch opacity, this button performs an action with the signUpAccount function and collects
      data from the input fields to register the user account on the server and return an authentication id*/}       
        <TouchableOpacity> 
          <Text onPress={() => this.signUpAccount()} style={styles.signUpButton} > SIGN UP </Text>
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
    display: 'flex',
},
name : {
  color: '#FFFFFF',
  fontSize: 20, 
  marginLeft: 290, 
  marginTop: 25,
  fontWeight: 'bold',
},
title3 : {
  width: 300, 
  height: 50,
  color: '#FFFFFF', 
  fontSize: 27, 
  marginLeft: 64,
  marginTop: 100,
  fontWeight: 'bold',
  justifyContent : 'center',
  textAlign : 'center',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  backgroundColor: '#30524D',
},
title4 : {
  color: '#FFFFFF',
  fontSize: 23, 
  marginLeft: 35, 
  marginTop: 20, 
  fontWeight: 'bold',
},
title5 : {
  color: '#FFFFFF',
  fontSize: 23, 
  marginLeft: 35, 
  marginTop: 10, 
  fontWeight: 'bold',
}, 
title6 : {
  color: '#FFFFFF',
  fontSize: 23, 
  marginLeft: 35, 
  marginTop: 10, 
  fontWeight: 'bold',
}, 
title7 : {
  color: '#FFFFFF',
  fontSize: 23, 
  marginLeft: 35, 
  marginTop: 10, 
  fontWeight: 'bold',
}, 
signUpButton : {
  fontSize: 32,
  color: '#FFFFFF',
  backgroundColor: '#81CD2A',
  width: 160,
  height: 60, 
  fontWeight: 'bold',
  borderWidth:  3,  
  borderColor:  '#e3e327',
  marginLeft: 135,
  marginTop: 30,
  textAlign: 'center'
},
});

export default SignIn


//import React, { Component } from 'react';
// import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
// // Imports the image used for the social media logo from the assets folder
// import logo from './assets/logo.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// class SignIn extends Component {
// constructor(props){
// super(props);
// this.state = {
// // Sets the state of the properties that will be entered by the user for registering
// isLoading: true,
// newUser: [],
// id : '',
// first_name : '',
// last_name : '',
// email : '',
// password : ''
// };
// }

// signUpAccount = () => {
// // Obtains the state of the input fields and specifies it as the information that will be sent to 
// // the server for registration 
//   // let to_send = {
//   //   first_name : this.state.first_name,
//   //   last_name : this.state.last_name,
//   //   email: this.state.email,
//   //   password: this.state.password
//   // };
// // This code fetches the API request in which the user account will be registered
//   return fetch("http://localhost:3333/api/1.0.0/user",{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(this.state) // The body where the entered information will be sent into to complete the sign up request
//   }) 
//   // Displays an alert message when the account is registered with the correct data from input fields or when the sign up is not
//   // completed successfully
//   .then((response) => {
//     if(response.status === 201){
//       return response.json()
//     }else if(response.status === 400){
//       console.log("Account not registered");
//     }else{
//       console.log("Something went wrong");
//   }
//   })
//   .catch((error) => {
//     console.log(error);
//     })
//   }

  
//   render() {
//     return (
//       <View style={styles.body}> 
//         <Text style={styles.name}> Spacebook </Text>
//         <img src={logo} style={{width: 40, height: 40, marginTop: -10, marginLeft: 365}}/>  
//        {/* The title for the page */}
//         <Text style={styles.title3}> Create An Account </Text>

//       {/* Sets the title for the first name and the input box to obtain the first name results to store on the server for user account details */}
//         <Text style={styles.title4}> FIRST NAME: </Text>
//         <TextInput placeholder='Enter First Name:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
//           marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
//           onChangeText={value => this.setState({first_name: value})}
//           value={this.state.first_name}/>

//       {/* Sets the title for the last name and the input box to obtain the last name results to store on the server for user account details */}
//         <Text style={styles.title5}> LAST NAME: </Text>
//         <TextInput placeholder='Enter Last Name:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
//           marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
//           onChangeText={value => this.setState({last_name: value})}
//           value={this.state.last_name}/>

//       {/* Sets the title for the email address and the input box to obtain the email address results to store on the server for user account details */}       
//         <Text style={styles.title6}> EMAIL ADDRESS: </Text>
//         <TextInput placeholder='Enter Email:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
//           marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
//           onChangeText={value => this.setState({email: value})}
//           value={this.state.email}/>

//       {/* Sets the title for the password and the input box to obtain the password results to store on the server for user account details */}       
//         <Text style={styles.title7}> PASSWORD: </Text>
//         <TextInput placeholder='Enter Password:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
//           marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
//           secureTextEntry={true} onChangeText={value => this.setState({password: value})}
//           value={this.state.password}/>

//       {/* A button that utilizes the signUpAccount function and collects data from the input fields to register 
//       the user account on the server and returning a authentication id for successful registration*/}       
//         <TouchableOpacity> 
//           <Text onPress={() => this.signUpAccount()} style={styles.signUpButton} > SIGN UP </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// // A StyleSheet is declared to format the components of the page
// const styles = StyleSheet.create({
// body : {
//     backgroundColor: '#60BEB0',
//     flex: 1, 
//     display: 'flex',
// },
// name : {
//   color: '#FFFFFF',
//   fontSize: 20, 
//   marginLeft: 290, 
//   marginTop: 25,
//   fontWeight: 'bold',
// },
// title3 : {
//   width: 300, 
//   height: 50,
//   color: '#FFFFFF', 
//   fontSize: 27, 
//   marginLeft: 64,
//   marginTop: 100,
//   fontWeight: 'bold',
//   justifyContent : 'center',
//   textAlign : 'center',
//   borderWidth:  3,  
//   borderColor:  '#e3e327',
//   backgroundColor: '#30524D',
// },
// title4 : {
//   color: '#FFFFFF',
//   fontSize: 23, 
//   marginLeft: 35, 
//   marginTop: 20, 
//   fontWeight: 'bold',
// },
// title5 : {
//   color: '#FFFFFF',
//   fontSize: 23, 
//   marginLeft: 35, 
//   marginTop: 10, 
//   fontWeight: 'bold',
// }, 
// title6 : {
//   color: '#FFFFFF',
//   fontSize: 23, 
//   marginLeft: 35, 
//   marginTop: 10, 
//   fontWeight: 'bold',
// }, 
// title7 : {
//   color: '#FFFFFF',
//   fontSize: 23, 
//   marginLeft: 35, 
//   marginTop: 10, 
//   fontWeight: 'bold',
// }, 
// signUpButton : {
//   fontSize: 32,
//   color: '#FFFFFF',
//   backgroundColor: '#81CD2A',
//   width: 160,
//   height: 60, 
//   fontWeight: 'bold',
//   borderWidth:  3,  
//   borderColor:  '#e3e327',
//   marginLeft: 135,
//   marginTop: 30,
//   textAlign: 'center'
// },
// });

// export default SignIn
