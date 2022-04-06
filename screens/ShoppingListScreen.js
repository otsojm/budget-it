import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";

import uploadImage from '../connections/firebase';

export default function ShoppingListScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState({ uri: null });
    const [images, setImages] = useState([]);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isCameraVisible, setisCameraVisible] = useState(false);

    const storage = getStorage();
    const listRef = ref(storage, 'images/');

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage({ uri: data.uri });
            uploadImage(data.uri);
        }
    }

    const handleCameraVisibility = () => {
        if (isCameraVisible) {
            setisCameraVisible(false);
            setImage({ uri: null });
        } else {
            setisCameraVisible(true);
        }
    }

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
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {isCameraVisible ?
                <View style={{ flex: 1 }}>
                    <View style={styles.cameraContainer}>
                        <Camera
                            ref={ref => setCamera(ref)}
                            style={styles.fixedRatio}
                            type={type}
                            ratio={'1:1'} />
                    </View>
                    <View style={styles.previewContainer}>
                        <Button
                            title="Flip Image"
                            buttonStyle={{ margin: 2 }}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                        </Button>
                        <Button title="Take Picture" buttonStyle={{ margin: 2 }} onPress={() => takePicture()} />
                        <Button title="Go back" buttonStyle={{ margin: 2 }} onPress={() => handleCameraVisibility()} />
                    </View>
                    {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
                </View>
                : <View style={{ flex: 1 }}>
                    <Button title="Update list" onPress={() => updateList()} />
                    <FlatList
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={images}
                        renderItem={({ item, index }) => (
                            <Image source={{ uri: item }}  /* Use item to set the image source */
                                key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                                style={{
                                    width: 260,
                                    height: 300,
                                    borderWidth: 2,
                                    borderColor: '#d35647',
                                    resizeMode: 'contain',
                                    margin: 8,
                                    marginLeft: 70
                                }}
                            />
                        )}
                    />
                    <View style={styles.listContainer}>
                        <Button title="CAMERA" buttonStyle={{ margin: 2, width: 125 }} onPress={() => handleCameraVisibility()} />
                        <Button title="VOICE" buttonStyle={{ margin: 2, width: 125 }} onPress={() => handleCameraVisibility()} />
                        <Button title="TEXT" buttonStyle={{ margin: 2, width: 125 }} onPress={() => handleCameraVisibility()} />
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
    previewContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 310,
        margin: 50
    }
})
