import { StyleSheet, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Imports the JS screens that will be used within the tab navigator
import Main from './Main';
import Friends from './Friends';
import FriendRequest from './FriendRequest';
// Imports the images from the assets folder 
import home from './assets/home.png';
import friends from './assets/friendsRequest.png';
import addFriends from './assets/addFriends.png';
import edit from './assets/edit.png';
import ProfileEdit from './ProfileEdit';
import FriendsWall from './FriendsWall';
import friendsWall from './assets/friendsWall.png';

const Tab = createBottomTabNavigator();
// Creates a Tab Navigator
function TabNavigator() {
    return (
    <Tab.Navigator>
        {/* The imported application pages are called into the tab screens */}
        <Tab.Screen name="Main1" component={Main}  
        options={{ 
            tabBarIcon: () => (<Image source={home} style={{width: 35, height: 35, fontSize: 12}}
        />) }} />
          {/* The imported images are called to set an icon for the pages on the tab navigation */}
        <Tab.Screen name="Search Friends" component={Friends} 
         options={{
            tabBarIcon: () => (<Image source={addFriends} style={{width: 35, height: 35, fontSize: 12}}
        />) }} />
        <Tab.Screen name="Friend Requests" component={FriendRequest} 
         options={{
            tabBarIcon: () => (<Image source={friends} style={{width: 35, height: 35, fontSize: 12}}
        />) }} />
         <Tab.Screen name="Profile Edit" component={ProfileEdit} 
         options={{
            tabBarIcon: () => (<Image source={edit} style={{width: 35, height: 35, fontSize: 12}}
        />) }} />
         <Tab.Screen name="Friends Wall" component={FriendsWall} 
         options={{
            tabBarIcon: () => (<Image source={friendsWall} style={{width: 35, height: 35, fontSize: 12}}
        />) }} />
    </Tab.Navigator>
    );
    }
// Creates a Stylesheet to format the tab navigation 
const styles = StyleSheet.create({
tab : {
    fontSize: 30, 
    backgroundColor: 'white', 
    width: 350, 
    height: 40, 
    marginLeft: 40, 
    borderWidth: 2.5, 
    borderColor: '#FFFFFF', 
    marginBottom: 25, 
    color: 'black'
},
});

export default TabNavigator;