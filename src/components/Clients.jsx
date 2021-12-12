import { View, Text, Pressable, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Clients () {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [clients, setClients] = useState([]);

    function deleteClient(id) {
        Alert.alert('Excluir', 'Tem certeza que deseja excluir o cliente ?', [
            { text: 'Cancel' },
            { text: 'Confirmar', onPress: () => {
                api.get('/client/delete/' + id)
                .then((response) => {
                    Alert.alert('Sucesso', 
                                'Cliente ' + response.data.client.name + ' excluido com sucesso',
                                 [{ text: 'OK' }]);
                    getListClient()
                })
                .catch((err) => console.log('the following error ocurred while listing the clients: ' + err.message))
            }},
          ]);
        
    }

    function getListClient(){
        api.get('/client/list')
        .then((response) => {
            setClients(response.data.clients)
        })
        .catch((err) => console.log('the following error ocurred while listing the clients: ' + err))
    }

    useEffect(() => {
        getListClient();  
    }, [])
      
    const onRefresh = React.useCallback(() => {
        getListClient();
    }, []);

    return (
        <View style={styles.page}>
            <ScrollView 
                style={styles.scroll}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}            
            >
                <Pressable onPress={() => navigation.navigate('CreateClient')} style={styles.add} 
                android_ripple={{borderless:true, radius: 50}}>
                    <AntDesign name="pluscircle" size={30} color="black" />
                    <Text style={{fontSize: 30}}>     Adicionar um Cliente</Text>
                </Pressable>

                {clients.map(client => 
                    <Pressable onPress={() => navigation.navigate('Products')} key={client._id} style={styles.clients}>
                        <Text style={styles.names}>{ client.name }</Text>
                        <View style={styles.clientFunction}>
                            <Pressable onPress={() => navigation.navigate('UpdateClient', {id: client._id})} style={styles.IconBehave} 
                                android_ripple={{borderless:true, radius: 50}}>
                                <AntDesign name="bars" size={30} color="black" />
                            </Pressable>
                            <Pressable onPress={() => deleteClient(client._id)} style={styles.IconBehave} 
                                android_ripple={{borderless:true, radius: 50}}>
                                <AntDesign name="delete" size={30} color="black" />
                            </Pressable>
                        </View>
                    </Pressable>  
                )}
            </ScrollView>
        </View>       
    )
}

const styles=  { 
    page:{
        paddingTop: 50,
        alignItens: 'center',
    },

    clients: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'center',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 40,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 40
    },  
    names: {
        width: '50%',
        textAlign: 'left',  
        fontSize: 30,
        color: 'black'
    },
    add: {
        position:'relative',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 40
    },
    IconBehave:{
        paddingHorizontal: 10
    },
    clientFunction: {
        justifyContent: 'flex-end',
        width: '50%',
        flexDirection: 'row'
    }
    
}
  
