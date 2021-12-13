import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

export default function NavBar () {

    const navigation = useNavigation();

    return (
        <View style={styles.NavBar}>

            <Pressable onPress={() => navigation.navigate('Rents')} style={styles.IconBehave} 
            android_ripple={{borderless:true, radius: 50}}>
                <FontAwesome name="book" size={24} color="black" />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Clients')} style={styles.IconBehave} 
            android_ripple={{borderless:true, radius: 50}}>
                <Ionicons name="person-circle" size={26} color="black" />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Products')} style={styles.IconBehave} 
            android_ripple={{borderless:true, radius: 50}}>
                <MaterialIcons name="home-repair-service" size={24} color="black" />
            </Pressable>
        </View>  
    )
}

const styles = StyleSheet.create({  
    NavBar: {
      flexDirection: 'row',
      backgroundColor: '#ddd',
      width: '90%',
      justifyContent: 'space-evenly',
      borderRadius: 40
    },
  
    IconBehave: {
      padding: 15
    }
  });
