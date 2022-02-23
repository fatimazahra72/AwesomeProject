import React, { Component } from 'react';
import { Header, Button, Left, Body, Right, Title, View, Form, Item, Text } from 'native-base';
import 'react-native-gesture-handler';
import axios from 'axios';
import { TextInput } from 'react-native'
import { checkLocalStorage, axiosDebug } from '../HelperUtil'

export default class Account extends Component {
  constructor(props) {
    super(props);
    /* set default placeholder values that we will set our data to */
    this.state = {
      token: '',
      id: 0,
      first_name: '',
      last_name: '',
      email: "",
      password: "",
    }
  };

  async componentDidMount() {
    /* upon page load fetch the token and id for the currently logged in user */
    const token = await checkLocalStorage("@session_token");
    const user_id = await checkLocalStorage("@seesion_id");
    this.setState({ id: id })
    this.setState({ token: token })
  }

  /* patch the data that is entered to be updated on the server */
  updateAccount = async () => {
    axios.patch("http://localhost:3333/api/1.0.0/user/" + this.state.id, {
      last_name: this.state.username,
      first_name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token
      }
    })
    //catch the error and display message to user
      .catch(error => {
        console.log(error);
        alert("Post couldn't be sent to the server successfully")
      });
      //return to the home screen once update is successfuly
    this.props.navigation.navigate("Home")
    alert("Account information updated successfully")
  }

  // render the UI for each field the user can enter into, button sends the new updated user info to the database
  render() {
    return (
      <View style={{}}>
        <Header>
          <Left />
          <Body>
            <Title>Edit Account</Title>
          </Body>
          <Right />
        </Header>
        <Form style={{
          top: 75,
        }}>
          <Item>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </Item>
          <Item last>
            <TextInput
              placeholder="Username"
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
            />
          </Item>
          <Item last>
            <TextInput
              placeholder="Name"
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
          </Item>
          <Item last>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </Item>
        </Form>
        <Button onPress={() => this.updateAccount()} style={{
          top: 250,
          width: 200,
          alignSelf: 'center',
          borderRadius: 10,
          justifyContent: 'center',
        }}><Text>Update Account</Text></Button>
      </View>
    );
  }