import { View, Text, Pressable, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Rents () {

    const navigation = useNavigation();
    const [name, setName] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [rents, setRents] = useState([]);

    function deleteRent(id) {
        Alert.alert('Excluir', 'Tem certeza que deseja excluir a Locação ?', [
            { text: 'Cancel' },
            { text: 'Confirmar', onPress: () => {
                api.get('/rent/delete/' + id)
                .then((response) => {
                    Alert.alert('Sucesso', 
                                'Locação ' + response.data.rent._id + ' excluido com sucesso',
                                 [{ text: 'OK' }]);
                    getListRent()
                })
                .catch((err) => console.log('the following error ocurred while deleting the rent: ' + err.message))
            }},
          ]);
    }

    function getClientName(id){
        if (id != null){
            api.get('/client/' + id)
            .then((response) => {
                console.log(response.data.client.name)
            })
            .catch((err) => console.log('the following error ocurred while getting the name: ' + err))
        }
    }
    
    function getListRent(){
        api.get('/rent/list')
        .then((response) => {
            setRents(response.data.rents)                
        })
        .catch((err) => console.log('the following error ocurred while listing the rents: ' + err))
    }

    useEffect(() => {
        getListRent();  
    }, [])
      
    const onRefresh = React.useCallback(() => {
        getListRent();
    }, []);

    return (
        <View style={styles.page}>
            <ScrollView 
                style={styles.scroll}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}            
            >
                <Pressable onPress={() => navigation.navigate('CreateRent')} style={styles.add} 
                android_ripple={{borderless:true, radius: 50}}>
                    <AntDesign name="pluscircle" size={30} color="black" />
                    <Text style={{fontSize: 30}}>     Adicionar uma locação</Text>
                </Pressable>

                {rents.map(rent => 
                    <View key={rent._id} style={styles.rents}>
                        <Pressable onPress={() => 
                                                { Alert.alert('Locação', 
                                                    'ID: ' + rent._id + 
                                                    '\nId do cliente: ' + rent.clientId + 
                                                    '\nId do produto: ' + rent.productId +
                                                    '\nData de entrega: ' + rent.deliveryDate.split("T")[0] + 
                                                    '\nData de retirada: ' + rent.pickUpDate.split("T")[0] +
                                                    '\nPreço: ' + rent.price ,
                                                    
                                                    [{ text: 'OK' }])
                                                }}
                                    style={styles.description}>
                            <Text style={styles.text}> {rent.clientId} </Text>
                        </Pressable>
                        
                        <View style={styles.rentFunction}>
                            <Pressable onPress={() => navigation.navigate('UpdateRent', {id: rent._id})} style={styles.IconBehave} 
                                android_ripple={{borderless:true, radius: 50}}>
                                <AntDesign name="bars" size={30} color="black" />
                            </Pressable>
                            <Pressable onPress={() => deleteRent(rent._id)} style={styles.IconBehave} 
                                android_ripple={{borderless:true, radius: 50}}>
                                <AntDesign name="delete" size={30} color="black" />
                            </Pressable>
                        </View>
                    </View>  
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

    rents: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
        paddingHorizontal: 40,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 40
    },  
    text: {
        fontSize: 25,
        color: 'black'
    },
    description: {
        width: '70%'
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
    rentFunction: {
        justifyContent: 'flex-end',
        width: '30%',
        flexDirection: 'row'
    }
    
}
  
