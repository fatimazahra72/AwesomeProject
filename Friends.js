import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      friendsData : [],
      search_string: '',
      user_givenname: '',
      user_familyname: '',
      email: '',
      password: '',
      id: '',
      user_id: '',
      friends: '',
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
    return fetch("http://localhost:3333/api/1.0.0/search?q=" + this.state.search_string, {
          headers: {
            'X-Authorization':  token
          },
          method: 'GET',
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 400){
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
        this.props.navigation.navigate('Log In');
    }
  };

addFriends = async (user_id) => {
  const id = await AsyncStorage.getItem('@session_id');
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://localhost:3333/api/1.0.0/user/"+ user_id +"/friends", {    
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      method: 'POST',// Uses the POST method as the user wants to log in
    })
    // Sends an alert message if the user has entered the correct details matching to a user 
    // ID and then user is logged in
  .then((response) => { 
      if(response.status === 200){
          console.log("Friend request has been submitted");
          this.getData()
      }else if(response.status === 401){
          console.log("Error: Could not add friend")
      }else if (response.status=== 403){
          console.log("Something went wrong");
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
          <TextInput placeholder='Enter User Name to add friend:' style={{fontSize: 19, backgroundColor: 'orange', width: 350, height: 40, marginLeft: 40, 
        marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
        value={this.state.search_string} onChangeText={value => this.setState({search_string: value})}/>

        <TouchableOpacity> 
      <Text onPress={() => this.getData()} style={styles.post} > Search </Text>
      </TouchableOpacity> 

      
        <FlatList
          data = {this.state.friendsData}
          renderItem={({item}) => (
          <View>
              <Text style={{height:20, backgroundColor: '#fafa75', color: 'black'}}> User Name: {item.user_givenname} {item.user_familyname}
              </Text>
            
      <TouchableOpacity> 
      <Text onPress={() => this.addFriends(item.user_id)} style={styles.post} > Add </Text>
      </TouchableOpacity> 
        {/* <TextInput placeholder='Enter User Name to add friend:' style={{fontSize: 19, backgroundColor: 'orange', width: 350, height: 40, marginLeft: 40, 
        marginTop: 10, borderWidth: 2.5, borderColor: '#FFFFFF'}}
        value={this.state.user_givenname} onChangeText={value => this.setState({user_givenname: value})}/> */}
      {/* <TouchableOpacity> 
      <Text onPress={() => this.getData(item.user_givenname)} style={styles.post} > Search </Text>
      </TouchableOpacity>  */}
            </View>

        )}
          keyExtractor={(item,index) => item.user_givenname}/> 
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

export default Friends;