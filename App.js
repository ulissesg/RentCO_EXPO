import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from './src/components/NavBar';
import Clients from './src/components/Clients';
import Products from './src/components/Products';
import Rents from './src/components/Rents';
import CreateClient from './src/components/CreateClient';
import UpdateClient from './src/components/UpdateClient';
import CreateProduct from './src/components/CreateProduct';
import UpdateProduct from './src/components/UpdateProduct';
import CreateRent from './src/components/CreateRent';
import UpdateRent from './src/components/UpdateRent';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer style={styles.container} >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Rents"         component={ Rents }         />
          <Stack.Screen name="Clients"       component={ Clients }       />
          <Stack.Screen name="Products"      component={ Products }      />
          <Stack.Screen name="CreateClient"  component={ CreateClient }  />
          <Stack.Screen name="UpdateClient"  component={ UpdateClient }  />
          <Stack.Screen name="CreateProduct" component={ CreateProduct } />
          <Stack.Screen name="UpdateProduct" component={ UpdateProduct } />
          <Stack.Screen name="CreateRent"    component={ CreateRent }    />
          <Stack.Screen name="UpdateRent"    component={ UpdateRent }    />

        </Stack.Navigator>
        <View style={styles.NavContainer}>
          <NavBar/>
        </View>
      </NavigationContainer>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavContainer: {
    position:'relative',
    alignItems: 'center',
    bottom: 20
  } 
});