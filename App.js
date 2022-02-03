// // import React, { Component } from 'react';
// // import { Text, View } from 'react-native';

// // class SayHello extends Component {
// //   render(){
// //     return (
// //       <View>
// //         <Text>Hello {this.props.name}</Text>
// //       </View>
// //     )
// //   };
// // }

// // class HelloWorldApp extends Component {
// //   render(){

// //     // let name = "zahra";
// //     // let name2 = "saqlain";
// //     // let name3 = "Sam";

// //     return (
// //         <View>
// //           <SayHello name="Zahra" />
// //           <SayHello name="Saqlain" />

// //           {/* <Text>Hello {name2}</Text>
// //           <Text>Hello {name3}</Text> */}
// //         </View>
// //     );
// //   }
// // }



// // export default HelloWorldApp

// // import React, { useState, useEffect } from 'react';
// // import { Text, View } from 'react-native';

// // const Blink = (props) => {
// //   const [isShowingText, setIsShowingText] = useState(true);

// //    useEffect(() => {
// //      const toggle = setInterval(() => {
// //        setIsShowingText(!isShowingText);
// //      }, 1000);

// //      return () => clearInterval(toggle);
// //   })

// //   if (!isShowingText) {
// //     return null;
// //   }

// //   return <Text>{props.text}</Text>;
// // }

// // const BlinkApp = () => {
// //   return (
// //     <View style={{marginTop: 50}}>
// //       <Blink text='I love to blink' />
// //       <Blink text='Yes blinking is so great' />
// //       <Blink text='Why did they ever take this out of HTML' />
// //       <Blink text='Look at me look at me look at me' />
// //     </View>
// //   );
// // }

// // export default BlinkApp;

// // 1.	Have a text input box at the top of the page.
// // 2.	Have a button next to the text input box called “Add”.
// // 3.	When the user clicks “Add,” the contents of the text input should be added to the components state.
// // 4.	Each item within the state should be listed underneath the text input and button.
// // 5.	Each list item should use the same, custom-built component.
// // 6.	Next to each list item should be a button called “Done”.
// // 7.	When the user clicks “Done,” the item should be removed from the list.
// // 8.	Make it pretty.



// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';
// import Button from './button';

// class HelloWorldApp extends Component {
//   constructor(props){
//     super(props);
 
//     this.state = {
//       color: "",
//       items: []
//     }


//   }

//   // show1=()=>{
//   //   alert("Your colour has been added");
//   // }

//   handleColourInput = (color) => {
//     this.setState({color: color})
//   }

//   addColoursToList = (color) =>{
//     let newColour = this.color;

//     this.setState({items : newColour, color: ""})
//   }




//   render(){
//     return (
//         // <View> 
//         // <TextInput placeholder = "colour..." onChangeText={value => this.setState({temp_item: value})}
//         //   value={this.state.temp_item}/>
//         // <Button text='Add' onPress={() => {
//         //     this.addItemToList();
//         //   }}>
//         // </Button>
//         // return (
//       <View>
//         <TextInput
//           placeholder='Add to list'
//           onChangeText={value => this.setState({temp_item: value})}
//           value={this.state.temp_item}
//         />
//         <Button 
//           onPress={() => {
//             this.addItemToList();
//           }}
//           title="Add"
//         />
//         <FlatList data={this.state.items} renderItem={({item, index}) =>
//             <View>
//               <Text>{item}</Text>
//               <Button title="Done"/>
//             </View>
//           } />
//       </View>
//     )
//   }
// }

// export default HelloWorldApp


// import React, { Component } from 'react';
// import { View, Text, TextInput, Button, FlatList } from 'react-native';
 
// class AddingColors extends Component{
 
//   constructor(props){
//     super(props);
 
//     this.state = {
//       items: [],
//       temp_item: ""
//     }
//   }
 
//   addColorToList = () => {
//     let newColorItems = this.state.colorItems.concat(this.state.temp_item);
//     this.setState({
//       colorItems: newColorItems,
//       temp_item: ""
//     });
//   }

//   removeColorItems = () => {

//   }
 
//   render(){
//     return (
//       <View>
//         <TextInput placeholder='Add colour to list' onChangeText={value => this.setState({temp_item: value})} 
//         value={this.state.colorItems}/>
//         <Button title="Click to add colour" onPress={() => { this.addColorToList(); }}/>
 
//         <FlatList data={this.state.colorItems} renderItem={({colorItems, index}) => 
//         <View>
//           <Text>{colorItems}</Text>
//           <Button title="Done" onPress={() => this.remove(index)}/>
//             </View> }/>
//       </View>
//     )
//   }
// }
 
// export default AddingColors;

// import React, { Component } from 'react';
// import { View, Text, TextInput, Button, FlatList } from 'react-native';
 
// class lab2Week extends Component{
 
//   constructor(props){
//     super(props);
 
//     this.state = {
//       items: [],
//       temp_item: ""
//     }
//   }
 
//   addItemToList = () => {
//     let newItems = this.state.items.concat(this.state.temp_item);
//     this.setState({
//       items: newItems,
//       temp_item: ""
//     });
//   }

//   remove = (index) => {
//     console.log(index);
//     let newList = this.state.items;
//     newList.splice(index, 1);
//     this.setState({items: newList});
//   }

 
//   render(){
//     return (
//       <View>
//         <TextInput placeholder='Add to list' onChangeText={value => this.setState({temp_item: value})}
//           value={this.state.temp_item}/>
//         <Button onPress={() => {this.addItemToList();}}
//           title="Add"/>
 
//         <FlatList data={this.state.items} renderItem={({item, index}) => 
//             <View>
//             <Text>{item}</Text>
//             <Button onPress={() => this.remove(index)} title="Done"/>
//             </View>}/>
//       </View>
//     )
//   }
// }
 
// export default lab2Week;

import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
 
class lab2Week extends Component{
 
  constructor(props){
    super(props);
 
    this.state = {
      colorItems: [],
      temp_item: ""
    }
  }
 
  addItemColorToList = () => {
    let newColorItems = this.state.colorItems.concat(this.state.temp_item);
    this.setState({
      colorItems: newColorItems,
      temp_item: ""
    });
  }

  removeColorItem = (index) => {
    console.log(index);
    let newList = this.state.colorItems;
    newList.splice(index, 1);
    this.setState({colorItems: newList});
  }

 
  render(){
    return (
      <View>
        <TextInput placeholder='Add to awesome list' onChangeText={value => this.setState({temp_item: value})}
          value={this.state.temp_item}/>
        <Button onPress={() => {this.addItemColorToList();}}
          title="Add"/>
 
        <FlatList data={this.state.colorItems} renderItem={({item, index}) => 
            <View>
            <Text>{item}</Text>
            <Button onPress={() => this.removeColorItem(index)} title="Done"/>
            </View>}/>
      </View>
    )
  }
}
 
export default lab2Week;