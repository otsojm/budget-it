import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
import Icon from 'react-native-vector-icons/FontAwesome';

import CameraScreen from './CameraScreen';
import TextModalScreen from './TextModalScreen';
import { returnTexts, deleteItem } from '../connections/firebase';

import { styles } from '../styles/styleShoppingList';

export default function ShoppingListScreen() {
    const [images, setImages] = useState([]);
    const [texts, setTexts] = useState([]);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);

    const storage = getStorage();
    const listRef = ref(storage, 'images/');

    /* Delete shopping list item from Firebase. */
    const handleDelete = async (uri, parameter) => {
        deleteItem(uri, parameter);
    };

    /* Set camera screens visibility to true/false. */
    const handleCameraVisibility = () => {
        if (isCameraVisible) {
            setIsCameraVisible(false);
        } else {
            setIsCameraVisible(true);
        }

    };

    /* Set memos visibility to true/false. */
    const handleTextVisibility = () => {
        if (isTextVisible) {
            setIsTextVisible(false);
        } else {
            setIsTextVisible(true);
        }
    };

    /* Return shopping list items from Firebase. */
    const updateList = async () => {
        let imageAddresses = [];
        let results = [];
        setImages([]);
        setTexts([]);

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
        results = await returnTexts();
        if (results.length > 0) {
            setTexts(results);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {isTextVisible ?
                <TextModalScreen handleTextVisibility={handleTextVisibility} />
                : null}
            {isCameraVisible ?
                <CameraScreen handleCameraVisibility={handleCameraVisibility} />
                : <View style={{ flex: 1 }}>
                    <Button icon={<Icon name="cloud-download" color="white" size={40} />} onPress={() => updateList()} />
                    <ScrollView>
                        <FlatList
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            data={images}
                            renderItem={({ item, index }) => (
                                <View>
                                    <Image source={{ uri: item }}
                                        key={index}
                                        style={styles.listItems}
                                    />
                                    <View>
                                        <Button icon={<Icon name="trash-o" color="white" size={30} />} buttonStyle={styles.buttonDelete} onPress={() => handleDelete(item, 'photo')} />
                                    </View>
                                </View>
                            )}
                        />
                        <FlatList
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            data={texts}
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={styles.listItemsText}>
                                        <Text key={index}>{item.value}</Text>
                                    </View>
                                    <Button icon={<Icon name="trash-o" color="white" size={30} />} buttonStyle={styles.buttonDelete} onPress={() => handleDelete(item, 'text')} />
                                </View>
                            )}
                        />
                    </ScrollView>
                    <View style={styles.listContainer}>
                        <Button icon={<Icon name="camera" color="white" size={40} />} buttonStyle={styles.buttonLeft} onPress={() => handleCameraVisibility()} />
                        <Button icon={<Icon name="keyboard-o" color="white" size={40} />} buttonStyle={styles.buttonRight} onPress={() => handleTextVisibility()} />
                    </View>
                </View>}
        </View>
    );
}
