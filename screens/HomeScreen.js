import { API_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Button } from 'react-native';
import { React, useState } from 'react';
import saveItem from '../connections/firebase';

export default function HomeScreen() {

    const [food, setFood] = useState('Nakki');

    async function postData() {
        await fetch(`${API_URL}`)
            .then(response => response.json())
            .then(data => setFood(data.results[0].content.search_results[0]));
        //console.log(`${APPID}`);
    };

    const handleSaveItem = () => {
        saveItem(food);
        /*push(
            ref(database, 'items/'),
            { 'product': "asd", 'amount': 1 });*/
    };

    return (
        <View style={styles.container}>
            <Text>{food.name}</Text>
            <Text>{food.min_price} $</Text>
            <Button onPress={handleSaveItem} title="Hae data" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

//console.log(data.results[0].content.search_results[0])
