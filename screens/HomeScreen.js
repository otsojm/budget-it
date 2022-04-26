import { View, Text, Image } from 'react-native';
import { React } from 'react';

import { styles } from '../styles/styleHome';

export default function HomeScreen() {
    const bodyText = "Budget-It on mobiiliapplikaatio oman henkilökohtaisen talouden menojen ja tulojen budjetoimiseen. Käyttäjä voi suunnitella tulevaa kulutustaan ja tulojaan sekä kategorisoida ne.\n\n" +
        "Hintatiedot lisätään joko manuaalisesti tai nimen perusteella tehdään rajapintaan haku. Applikaatiossa on mahdollista tarkastella historiallista kulutusta eri tavoilla (esim. listana, graafeina)" +
        " ja applikaatio arvioi, onko käyttäjän kulutus kestävällä pohjalla.\n\n" +
        "Applikaatio käyttää hyödykseen eri laiteominaisuuksia, joita käyttäjän mobiililaitteelta löytyy, kuten kamera (esim. kuvien liittäminen kauppalistaan) ja " +
        "sijainti (esim. applikaatio etsii tietyn alan kaupat läheltä).";

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
        </View>
    );
}
