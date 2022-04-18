import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { uploadExpense } from '../connections/firebase';

export default function AddIncomeScreen() {
    const [selectedValue, setSelectedValue] = useState('01-M');
    const [amount, setAmount] = useState(0);

    const handleExpense = () => {
        uploadExpense(selectedValue, amount);
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
                <Picker.Item label="01-M Ruokakauppa" value="01-M" />
                <Picker.Item label="02-M Elektroniikka" value="02-M" />
                <Picker.Item label="03-M Muu" value="03-M" />
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
            <Button title="Save" buttonStyle={{ margin: 2 }} onPress={() => handleExpense()} />
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
