import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, Text, Pressable, Alert } from 'react-native';
import api from '../../services/api';

export default function CreateProduct() {

    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    function createProduct(){

        if(code !== "" && description !== "" && type !== "" && price !== ""){
            api.post('/product/create',{
                "code": code,
                "description": description,
                "type": type,
                "price": price
            })
            .then((response) => {
                Alert.alert('Sucesso', 'Produto ' + description + ' criado com sucesso', [{ text: 'OK' }]);
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

            <Text style={styles.label}>Code *</Text>
            <TextInput 
                style={styles.input}   
                onChangeText={text => setCode(text)} 
                value={code}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setDescription(text)}
                value={description} 
            />

            <Text style={styles.label}>Tipo *</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setType(text)} 
                value={type} 
                keyboardType="numeric"
            />
            
            <Text style={styles.label}>Preço *: </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setPrice(text)} 
                value={price}
                keyboardType="numeric" 
            />
            

            <Pressable style={styles.button} onPress={() => createProduct()}>
                <Text style={{color: 'white'}}>Adicionar</Text>
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