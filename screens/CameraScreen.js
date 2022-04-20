import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import { uploadImage } from '../connections/firebase';
import ModalScreen from './ModalScreen';

import { styles } from '../styles/styleCamera';


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
        props.handleCameraVisibility();
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
                    icon={<Icon name="exchange" color="white" size={30} />}
                    buttonStyle={styles.buttonFlip}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                </Button>
                <Button icon={<Icon name="camera" color="white" size={30} />} buttonStyle={styles.buttonTake} onPress={() => takePicture()} />
                <Button icon={<Icon name="save" color="white" size={30} />} buttonStyle={styles.buttonExit} onPress={() => handleModal()} />
            </View>
            {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
        </View>
    );
}
