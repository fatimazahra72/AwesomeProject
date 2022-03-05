import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import LogOut from './LogOut';
import TabNavigator from './TabNavigation';
import PostWall from './PostWall';
import CameraImage from './Camera';
import Followers from './Followers';


const Stack = createNativeStackNavigator();

function navigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator intitialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Log Out" component={LogOut} />
      <Stack.Screen name="FriendsWall" component={PostWall} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Camera" component={CameraImage} />
    </Stack.Navigator>
    </NavigationContainer>
);
}
 export default navigator;