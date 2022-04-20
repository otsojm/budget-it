import React, { useState } from "react";
import { Modal, View, TextInput } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { uploadText } from '../connections/firebase';

import { styles } from '../styles/styleTextModalScreen';

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
                            <Button icon={<Icon name="save" color="white" size={30} />} buttonStyle={[styles.button, styles.buttonOpen]} onPress={() => handleText(true)} />
                            <Button icon={<Icon name="trash-o" color="white" size={30} />} buttonStyle={[styles.button, styles.buttonClose]} onPress={() => handleText(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
