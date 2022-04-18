import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput, Dimensions } from "react-native";
import { Button } from 'react-native-elements';

import { uploadText } from '../connections/firebase';

export default function TextModalScreen(props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [text, setText] = useState('');

    const handleText = (data) => {
        props.handleTextVisibility();
        setModalVisible(false);
        if (data) {
            uploadText(text);
        }
        setText('');
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            multiline
                            numberOfLines={20}
                            onChangeText={text => setText(text)}
                            value={text}
                            style={styles.modalText}
                            placeholder="Type here."
                        />
                        <View style={styles.listContainer}>
                            <Button title="Save text" buttonStyle={[styles.button, styles.buttonOpen]} onPress={() => handleText(true)} />
                            <Button title="Delete text" buttonStyle={[styles.button, styles.buttonClose]} onPress={() => handleText(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        margin: 10
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingTop: 200
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonClose: {
        backgroundColor: "red",
    },
    buttonOpen: {
        backgroundColor: "green",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
