import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/FontAwesome';

import { GOOGLE_API } from "@env";

export default function FindStoreScreen() {
    const [keyword, setKeyword] = useState('');
    const [coordinates, setCoordinates] = useState({ "lat": 60.20179, "lng": 24.93396 });
    const [places, setPlaces] = useState([]);

    async function getLocations() {
        const res = keyword.replace(/ /g, '')

        await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.lat}%2C${coordinates.lng}&radius=10000&type=store&keyword=${res}&key=${GOOGLE_API}`)
            .then(response => response.json())
            .then(responseJson => setPlaces(responseJson.results))
            .catch(error => {
                Alert.alert('Error', error);
            });
        setKeyword('');
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location.')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCoordinates({ "lat": location.coords.latitude, "lng": location.coords.longitude });
        })();
    }, []);

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <MapView style={StyleSheet.absoluteFillObject} initialRegion={{ latitude: coordinates.lat, longitude: coordinates.lng, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }} >
                {places.map((entry, index) => (
                    <Marker coordinate={{ latitude: entry.geometry.location.lat, longitude: entry.geometry.location.lng }} title={entry.name} key={index} />
                ))}
                <Marker coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }} pinColor="blue" title="Your location" />
            </MapView>
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} behavior="position">
                <TextInput placeholder='    Store name' style={{ width: '100%', height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }} value={keyword} onChangeText={value => setKeyword(value)} />
                <Button title=' Stores within 10 km' icon={<Icon name="search" color="white" size={20} />} onPress={() => getLocations()} ></Button>
            </View>
        </View>
    );
}
