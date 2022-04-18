import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { uploadIncome } from '../connections/firebase';

export default function AddIncomeScreen() {
    const [selectedValue, setSelectedValue] = useState('01-T');
    const [amount, setAmount] = useState(0);

    const handleIncome = () => {
        uploadIncome(selectedValue, amount);
    };

    return (
        <View
            style={{
                backgroundColor: 'white',
                borderBottomColor: '#000000',
                borderBottomWidth: 1,
            }}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150, marginLeft: 140 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="01-T Ansiotulo" value="01-T" />
                <Picker.Item label="02-T Pääomatulo" value="02-T" />
                <Picker.Item label="03-T Muu" value="03-T" />
            </Picker>
            <TextInput
                multiline
                numberOfLines={4}
                onChangeText={amount => setAmount(amount)}
                value={amount}
                style={{ padding: 10 }}
                placeholder="Amount"
                keyboardType="numeric"
            />
            <Button title="Save" buttonStyle={{ margin: 2 }} onPress={() => handleIncome()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
