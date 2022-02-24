import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class FriendRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      friendsData : [],
      first_name: '',
      last_name: '',
      email: '',
      password: '',
       id: '',
       user_id: '',
       friends: '',
       friends2: '',
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
    return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
          headers: {
            'X-Authorization':  token
          },
          method: 'GET',
    })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Main");
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            friendsData: responseJson
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

  acceptFriends = async (user_id) => {
    const id = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+ user_id, {    
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        method: 'POST',// Uses the POST method as the user wants to log in
       // body: JSON.stringify({"user_id": this.state.friends})
      })
      // Sends an alert message if the user has entered the correct details matching to a user 
      // ID and then user is logged in
    .then((response) => {
        if(response.status === 201){
            //return response.json()
            console.log("Accepted the friend request");
            this.getData();
        }else if(response.status === 400){
            console.log("Error: No more friend requests to be accepted")
        }else{
            throw 'Something went wrong';
        }
    })
      .catch((error) => {
        console.log(error);
        this.getData();
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

        

        <FlatList
          data = {this.state.friendsData}
          renderItem={({item}) => (
          <View>
              <Text style={{height:100, backgroundColor: '#fafa75', color: 'black'}}> Friends: {item.user_id}
              </Text>

        {/* <TextInput placeholder='Enter User Name to add friend:' style={{fontSize: 19, backgroundColor: 'orange', width: 350, height: 40, marginLeft: 40, 
        marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
        value={this.state.friends2} onChangeText={value => this.setState({friends2: value})}/> */}
        
        <TouchableOpacity> 
      <Text onPress={() => this.acceptFriends(item.user_id)} style={styles.post} > Add friends </Text>
      </TouchableOpacity> 
            </View>
        )}
          keyExtractor={(item,index) => item.user_id.toString()}/> 
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

export default FriendRequest;