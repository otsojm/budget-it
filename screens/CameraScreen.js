import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';

import { uploadImage } from '../connections/firebase';
import ModalScreen from './ModalScreen';

export default function CameraScreen(props) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState({ uri: null });
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        }
    };

    const handleModal = () => {
        setIsModalVisible(true);
    };

    const handlePicture = (data) => {
        handleCameraVisibility();

        if (data) {
            uploadImage(image.uri);
        }
        setImage({ uri: null });
    };

    const handleCameraVisibility = () => {
        props.handleCameraVisibility(false);
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera.</Text>;
    };

    return (
        <View style={{ flex: 1 }}>
            {isModalVisible ? <ModalScreen handlePicture={handlePicture} /> :
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={styles.fixedRatio}
                        type={type}
                        ratio={'1:1'} />
                </View>}
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
                <Button title="Go back" buttonStyle={{ margin: 2 }} onPress={() => handleModal()} />
            </View>
            {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
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
    previewContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 310,
        margin: 50
    }
});
