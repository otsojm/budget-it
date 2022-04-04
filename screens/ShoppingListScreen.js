import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function ShoppingListScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState({ uri: null, name: null });
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isCameraVisible, setisCameraVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            console.log(data.uri);
            setImage({ uri: data.uri, name: (data.uri).toString().split("Camera/")[1] });
        }
    }

    const goBack = () => {
        if (isCameraVisible) {
            setisCameraVisible(false);
        } else {
            setisCameraVisible(true);
        }
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
                    <Button
                        title="Flip Image"
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                    </Button>
                    <Button title="Take Picture" onPress={() => takePicture()} />
                    <Button title="Go back" onPress={() => goBack()} />
                    {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
                </View>
                : <View style={{ flex: 1 }}><Button title="Access camera" onPress={() => goBack()} />
                    <Text>{image.name}</Text>
                    {image && <Image source={{ uri: image.uri }} style={{ flex: 0.3 }} />}
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
    }
})
