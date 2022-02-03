import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function Button({ text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={style.button}>
                <Text style={style.buttonText}>{ text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#f01d71',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }

})