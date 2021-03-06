import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, Text, Pressable, Alert } from 'react-native';
import api from '../../services/api';

export default function UpdateClient() {

    const route = useRoute();

    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState();
    const [balance, setBalance] = useState();
 
    useEffect(() => {
        api.get('/client/' + route.params.id)
        .then((response) => {
            setName(response.data.client.name.toString());
            setTelephone(response.data.client.telephone.toString());
            setAddress(response.data.client.address.toString());
            setType(response.data.client.clientType.toString());
            setBalance(response.data.client.balance.toString());
        })
        .catch((err) => console.log('the following error ocurred while listing the clients: ' + err)) 
    }, [])
    

    function updateClient(){

        if(name !== "" && telephone !== "" && address !== "" && type !== ""){
            api.post('/client/update/' + route.params.id,{
                "name": name,
                "telephone": telephone,
                "address": address,
                "clientType": type,
                "balance": balance 
            })
            .then((response) => {
                Alert.alert('Sucesso', 'Cliente ' + name + ' editado com sucesso', [{ text: 'OK' }]);
            })
            .catch((err) => {
                Alert.alert('Erro', 'O seguinte erro ocorreu: ' + err, [{ text: 'OK' }]);
            })
        }else{
            Alert.alert('Aviso', 'Algum dos campos obrigatórios não foi preenchido !', [{ text: 'OK' }]);
        }
    }

    return(
        <ScrollView style={styles.page}>

            <Text style={styles.label}>Nome *</Text>
            <TextInput 
                style={styles.input}   
                onChangeText={text => setName(text)} 
                value={name}
            />

            <Text style={styles.label}>Telefone *</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setTelephone(text)}
                value={telephone} 
                keyboardType="numeric"
            />

            <Text style={styles.label}>Endereço *</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setAddress(text)} 
                value={address} 
            />
            
            <Text style={styles.label}>Tipo (%)*: </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setType(text)} 
                value={type}
                keyboardType="numeric" 
            />
            
            <Text style={styles.label}>Saldo </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setBalance(text)} 
                value={balance} 
                keyboardType="numeric"
            />

            <Pressable style={styles.button} onPress={() => updateClient()}>
                <Text style={{color: 'white'}}>Editar</Text>
            </Pressable>
        </ScrollView>
    )

}

const styles = {
    page: {
        padding:20
    },

    label: {
        padding: 10,
        paddingTop: 20,
        fontSize: 20
    },

    input: {
        height: 50,
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
    },
    
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 20,
        backgroundColor: 'black',
        marginVertical: 20
    }

}