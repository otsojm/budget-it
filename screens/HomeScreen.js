import { API_URL } from "@env";
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { React, useState } from 'react';

export default function HomeScreen() {
    const [food, setFood] = useState('');
    const bodyText = "Budget It on mobiiliapplikaatio oman henkilökohtaisen talouden menojen ja tulojen budjetoimiseen.Käyttäjä voi suunnitella tulevaa kulutustaan ja tulojaan sekä kategorisoida ne.\n\n" +
        "Hintatiedot lisätään joko manuaalisesti tai nimen perusteella tehdään rajapintaan haku. Applikaatiossa on mahdollista tarkastella historiallista kulutusta eri tavoilla (esim. listana, graafeina)" +
        "ja applikaatio tekee ennusteita esim. muutoksista kulutuksessa sekä siitä, onko käyttäjän kulutus kestävällä pohjalla.\n\n" +
        "Applikaatio käyttää hyödykseen eri laiteominaisuuksia, joita käyttäjän mobiililaitteelta löytyy, kuten kamera (esim. kuvien liittäminen kauppalistaan), mikrofoni (esim. kauppalistan sanelu) ja " +
        "sijainti (esim. applikaatio etsii tietyn alan kaupat läheltä).";

    async function postData() {
        await fetch(`${API_URL}`)
            .then(response => response.json())
            .then(data => setFood(data.results[0].content.search_results[0]));
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://i.ibb.co/M1KvhTS/face2eb1a57a445980c997e895440d07.png',
                    }}
                />
            </View>
            <Text style={styles.baseText}>
                <Text>{bodyText}</Text>
            </Text>
            <Text>{food.name}</Text>
            <Text>{food.min_price} $</Text>
            <Button onPress={postData} title="Hae data" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cfdeeb',
        alignItems: 'center',
        justifyContent: 'center'
    },
    baseText: {
        fontFamily: "Cochin",
        fontSize: 15
    },
    imageContainer: {
        paddingBottom: 100,
    },
    tinyLogo: {
        width: 200,
        height: 200,
    }
});
