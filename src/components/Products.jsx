import { View, Text, Pressable, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Products () {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);

    function deleteProduct(id) {
        Alert.alert('Excluir', 'Tem certeza que deseja excluir o Produto ?', [
            { text: 'Cancel' },
            { text: 'Confirmar', onPress: () => {
                api.get('/product/delete/' + id)
                .then((response) => {
                    Alert.alert('Sucesso', 
                                'Produto ' + response.data.product.description + ' excluido com sucesso',
                                 [{ text: 'OK' }]);
                    getListProduct()
                })
                .catch((err) => console.log('the following error ocurred while deleting the product: ' + err.message))
            }},
          ]);
        
    }

    function getListProduct(){
        api.get('/product/list')
        .then((response) => {
            setProducts(response.data.products)
        })
        .catch((err) => console.log('the following error ocurred while listing the products: ' + err))
    }

    useEffect(() => {
        getListProduct();  
    }, [])
      
    const onRefresh = React.useCallback(() => {
        getListProduct();
    }, []);

    return (
        <View style={styles.page}>
            <ScrollView 
                style={styles.scroll}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}            
            >
                <Pressable onPress={() => navigation.navigate('CreateProduct')} style={styles.add} 
                android_ripple={{borderless:true, radius: 50}}>
                    <AntDesign name="pluscircle" size={30} color="black" />
                    <Text style={{fontSize: 30}}>     Adicionar um Produto</Text>
                </Pressable>

                {products.map(product => 
                    <View key={product._id} style={styles.products}>
                        <Pressable onPress={() => navigation.navigate('Info')} style={styles.description}>
                            <Text style={styles.text}>{ product.code } - { product.description }</Text>
                        </Pressable>
                        
                        <View style={styles.productFunction}>
                            <Pressable onPress={() => navigation.navigate('UpdateProduct', {id: product._id})} style={styles.IconBehave} 
                                android_ripple={{borderless:true, radius: 50}}>
                                <AntDesign name="bars" size={30} color="black" />
                            </Pressable>
                            <Pressable onPress={() => deleteProduct(product._id)} style={styles.IconBehave} 
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

    products: {
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
    productFunction: {
        justifyContent: 'flex-end',
        width: '30%',
        flexDirection: 'row'
    }
    
}
  
