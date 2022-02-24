import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import LogOut from './LogOut';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Friends from './Friends';
import TabNavigation from './TabNavigation';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      postData : [],
      text : '',
      post: '',
      post2: '',
      post_id: '',
       id: '',
       email:'',
    }
  }
  
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@session_id');
    return fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post", {
          headers: {
            'X-Authorization':  token
          },
          method: 'GET'
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("LogIn");
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
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
        this.props.navigation.navigate('LogIn');
    }
  };

  newPost = async () => {
    const id = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/user/"+ id+ "/post", {    
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        method: 'POST',// Uses the POST method as the user wants to log in
        body: JSON.stringify({"text": this.state.post})
      })
      // Sends an alert message if the user has entered the correct details matching to a user 
      // ID and then user is logged in
    .then((response) => {
        if(response.status === 201){
            //return response.json()
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

  removePost = async (post_id) => {
    const id = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/user/"+ id+ "/post/" + post_id, {    
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        method: 'DELETE',// Uses the POST method as the user wants to log in
        // body: JSON.stringify({"text": this.state.post})
      })
      // Sends an alert message if the user has entered the correct details matching to a user 
      // ID and then user is logged in
    .then((response) => {
        if(response.status === 200){
            //return response.json()
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

  updatePost = async (post_id) => {
    const id = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/user/"+ id + "/post/" + post_id, {    
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        method: 'PATCH',// Uses the POST method as the user wants to log in
        body: JSON.stringify({"text": this.state.post2})
      })
      // Sends an alert message if the user has entered the correct details matching to a user 
      // ID and then user is logged in
    .then((response) => {
        if(response.status === 200){
            //return response.json()
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

  render() {

    if (this.state.isLoading){
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            width: 100,
          }}>
          </View>
        
      );
    }else{
      // if (this.state.isLoading){
      return (
        <View>
          <Text> WELCOME </Text> 
          <Text style={styles.title4}> POST: </Text>

      <TouchableOpacity> 
      <Text style={styles.post} onPress={() => this.props.navigation.navigate('Log Out')}> LOG OUT </Text>
      </TouchableOpacity>
      <TextInput placeholder='Enter Your Post:' style={{fontSize: 19, backgroundColor: '#fafa75', width: 350, height: 40, marginLeft: 40, 
      marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
      value={this.state.post} onChangeText={value => this.setState({post: value})}/>

      <TouchableOpacity> 
      <Text onPress={() => this.newPost()} style={styles.post} > POST NOW </Text>
      </TouchableOpacity>

        <FlatList
          data = {this.state.postData}
          renderItem={({item}) => (
          <View>
              <Text style={{height:100, backgroundColor: '#fafa75', color: 'black'}}> Post: {item.text}
              </Text>
              <Text style={{height:100, backgroundColor: '#fafa75', color: 'black'}}> User: {item.email}
              </Text>

        <TouchableOpacity> 
        <Text onPress={() => this.removePost(item.post_id)} style={styles.post} > DELETE </Text>
        </TouchableOpacity>

        <TextInput placeholder='Enter Update Post:' style={{fontSize: 19, backgroundColor: 'orange', width: 350, height: 40, marginLeft: 40, 
        marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
        value={this.state.post2} onChangeText={value => this.setState({post2: value})}/>

        <TouchableOpacity> 
        <Text onPress={() => this.updatePost(item.post_id)} style={styles.post} > update </Text>
        </TouchableOpacity>
            </View>
        )}
          keyExtractor={(item,index) => item.post_id.toString()}/> 

        </View>
      );
     }
    }
  }


const styles = StyleSheet.create({
    post : {
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

export default Main;