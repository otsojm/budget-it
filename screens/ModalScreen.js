import React, { useState } from "react";
import { Modal, Text, Pressable, View } from "react-native";

import { styles } from '../styles/styleModalScreen';

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
