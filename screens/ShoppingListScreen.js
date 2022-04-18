import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";

import CameraScreen from './CameraScreen';
import { deleteItem } from '../connections/firebase';

export default function ShoppingListScreen() {
    const [images, setImages] = useState([]);
    const [isCameraVisible, setIsCameraVisible] = useState(false);

    const storage = getStorage();
    const listRef = ref(storage, 'images/');

    const handleDelete = async (uri) => {
        deleteItem(uri);
    };

    const handleCameraVisibility = (data) => {
        if (data != undefined) {
            setIsCameraVisible(data);
        } else {
            if (isCameraVisible) {
                setIsCameraVisible(false);
            } else {
                setIsCameraVisible(true);
            }
        }
    };

    const updateList = async () => {
        let imageAddresses = [];
        setImages([]);

        await list(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    imageAddresses.push(itemRef._location.path_);
                });
            }).catch((error) => {
                console.error(error);
            });
        imageAddresses.forEach(image => {
            getDownloadURL(ref(storage, image))
                .then((url) => {

                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();

                    setImages(currentArray => [...currentArray, url])
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {isCameraVisible ?
                <CameraScreen handleCameraVisibility={handleCameraVisibility} />
                : <View style={{ flex: 1 }}>
                    <Button title="Update list" onPress={() => updateList()} />
                    <FlatList
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={images}
                        renderItem={({ item, index }) => (
                            <View>
                                <Image source={{ uri: item }}
                                    key={index}
                                    style={{
                                        width: 260,
                                        height: 300,
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        resizeMode: 'contain',
                                        margin: 8,
                                        marginLeft: 70
                                    }}
                                />
                                <Button title="Delete" buttonStyle={{ margin: 2, marginLeft: 140, width: 125, backgroundColor: 'red' }} onPress={() => handleDelete(item)} />
                            </View>
                        )}
                    />
                    <View style={styles.listContainer}>
                        <Button title="CAMERA" buttonStyle={styles.buttons} onPress={() => handleCameraVisibility()} />
                        <Button title="VOICE" buttonStyle={styles.buttons} onPress={() => handleCameraVisibility()} />
                        <Button title="TEXT" buttonStyle={styles.buttons} onPress={() => handleCameraVisibility()} />
                    </View>
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    listContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        margin: 10
    },
    buttons: {
        margin: 2,
        width: 125
    }
});
