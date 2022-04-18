import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default function ModalScreen(props) {
    const [modalVisible, setModalVisible] = useState(true);

    const handlePicture = (data) => {
        props.handlePicture(data);
        setModalVisible(false);
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
                        <Text style={styles.modalText}>Do you want use the latest photo?</Text>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => handlePicture(true)}
                        >
                            <Text style={styles.textStyle}>Yes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handlePicture(false)}
                        >
                            <Text style={styles.textStyle}>No</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
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
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonClose: {
        backgroundColor: "#F194FF",
    },
    buttonOpen: {
        backgroundColor: "#2196F3",
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
