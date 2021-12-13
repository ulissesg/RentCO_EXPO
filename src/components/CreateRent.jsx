import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, Text, Pressable, Alert } from 'react-native';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';

export default function CreateProduct() {

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [productValue, setProductValue] = useState();
    const [client, setClient] = useState();
    const [clientId, setClientId] = useState("");
    const [productId, setProductId] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [pickUpDate, setPickUpDate] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        api.get('/product/' + productId)
        .then((response) => setProductValue(response.data.product.price))
        .catch((err) => console.log('the following error ocurred while listing the clients: ' + err.message))
    }, [productId])

    useEffect(() => {
        api.get('/client/' + clientId)
        .then((response) => setClient(response.data.client))
        .catch((err) => console.log('the following error ocurred while getting the client: ' + err.message))
    }, [clientId])

    useEffect(() => {
        api.get('/client/list')
        .then((response) => setClients(response.data.clients))
        .catch((err) => console.log('the following error ocurred while listing the clients: ' + err.message))
    }, [])

    useEffect(() => {
    api.get('/product/list')
        .then((response) => setProducts(response.data.products))
        .catch((err) => console.log('the following error ocurred while listing the products: ' + err.message))
    }, [])

    function createRent(){
        const price = (productValue - ((productValue * client.clientType) / 100));
        if(clientId !== "" && productId !== "" && deliveryDate !== "" && pickUpDate !== "" ){
            api.post('/rent/create',{
                "clientId": clientId,
                "productId": productId,
                "deliveryDate": deliveryDate,
                "pickUpDate": pickUpDate,
                "price": price
            })
            .then((response) => {
                api.post('/client/update/' + client._id,{
                    "name": client.name,
                    "telephone": client.telephone,
                    "address": client.address,
                    "clientType": client.clientType,
                    "balance": (client.balance + price)
                }).then((response) => {
                    Alert.alert('Sucesso', 'Locação criada com sucesso', [{ text: 'OK' }]);
                })
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
            <Text style={styles.label}>Cliente *</Text>
            <Picker
                selectedValue={clientId}
                onValueChange={(v) => setClientId(v)}
                accessibilityLabel="Basic Picker Accessibility Label">
                    {clients.map((client) => 
                        <Picker.Item label={client.name} value={client._id} />
                    )}
            </Picker>

            <Text style={styles.label}>Produto *</Text>
            <Picker
                selectedValue={productId}
                onValueChange={(v) => setProductId(v)}
                accessibilityLabel="Basic Picker Accessibility Label">
                    {products.map((product) => 
                        <Picker.Item key ={product._id} label={product.description} value={product._id} />
                    )}
            </Picker>

            <Text style={styles.label}>Data de entrega *</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setDeliveryDate(text)} 
                value={deliveryDate} 
            />
            <Text style={styles.label}>Data de retirada *</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setPickUpDate(text)} 
                value={pickUpDate} 
            />
            
            <Text style={styles.label}>Preço *: </Text>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setPrice(text)} 
                value={price}
                keyboardType="numeric" 
            />
            

            <Pressable style={styles.button} onPress={() => createRent()}>
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