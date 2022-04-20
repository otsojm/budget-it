import React, { useState } from 'react';
import { View, TextInput, ScrollView, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { uploadIncome, returnIncomes, deleteItem } from '../connections/firebase';

import { styles } from '../styles/styleIncomes';

export default function AddIncomeScreen() {
    const [selectedValue, setSelectedValue] = useState('01-T Ansiotulo');
    const [incomes, setIncomes] = useState([]);
    const [amount, setAmount] = useState(0);

    const handleIncome = () => {
        uploadIncome(selectedValue, amount);
        setAmount(0);
        setSelectedValue('01-T Ansiotulo');

    };

    async function getIncomes() {
        let result = [];
        setIncomes([]);

        result = await returnIncomes();
        if (result.length > 0) {
            setIncomes(result);
        }
    };

    const handleDelete = async (uri, parameter) => {
        deleteItem(uri, parameter);
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="01-T Ansiotulo" value="01-T Ansiotulo" />
                <Picker.Item label="02-T Pääomatulo" value="02-T Pääomatulo" />
                <Picker.Item label="03-T Muu" value="03-T Muu" />
            </Picker>
            <TextInput
                numberOfLines={1}
                onChangeText={amount => setAmount(amount)}
                value={amount}
                style={{ padding: 10 }}
                placeholder="Amount"
                keyboardType="numeric"
            />
            <View style={styles.listContainer}>
                <Button icon={<Icon name="save" color="white" size={30} />} buttonStyle={styles.buttonSave} onPress={() => handleIncome()} />
                <Button icon={<Icon name="cloud-download" color="white" size={30} />} buttonStyle={styles.buttonCloud} onPress={() => getIncomes()} />
            </View>
            <ScrollView>
                <FlatList
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={incomes}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <Text style={styles.listItems}>{item.name}</Text>
                            <Text style={styles.textAmount}>{item.amount} €</Text>
                            <Button icon={<Icon name="trash-o" color="white" size={30} />} buttonStyle={styles.buttonDelete} onPress={() => handleDelete(item, 'income')} />
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
}
