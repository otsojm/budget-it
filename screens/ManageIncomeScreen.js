import React, { useState } from 'react';
import { View, TextInput, ScrollView, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { uploadIncome, returnIncomes, deleteItem } from '../connections/firebase';

import { styles } from '../styles/styleIncomes';

export default function AddIncomeScreen() {
    const [selectedValue, setSelectedValue] = useState('Ansiotulo');
    const [selectedMonth, setSelectedMonth] = useState('Jan');
    const [incomes, setIncomes] = useState([]);
    const [amount, setAmount] = useState(0);

    /* Insert incomes to Firebase. */
    const handleIncome = () => {
        uploadIncome(selectedValue, amount, selectedMonth);
        setAmount(0);
        setSelectedValue('Ansiotulo');
        setSelectedMonth('Jan');

    };

    /* Return incomes from Firebase. */
    async function getIncomes() {
        let result = [];
        setIncomes([]);

        result = await returnIncomes();
        if (result.length > 0) {
            setIncomes(result);
        }
    };

    /* Delete incomes from Firebase. */
    const handleDelete = async (uri, parameter) => {
        deleteItem(uri, parameter);
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedMonth}
                style={styles.picker}
                onValueChange={(monthValue) => setSelectedMonth(monthValue)}
            >
                <Picker.Item label="Jan" value="Jan" />
                <Picker.Item label="Feb" value="Feb" />
                <Picker.Item label="Mar" value="Mar" />
                <Picker.Item label="Apr" value="Apr" />
                <Picker.Item label="May" value="May" />
                <Picker.Item label="Jun" value="Jun" />
                <Picker.Item label="Jul" value="Jul" />
                <Picker.Item label="Aug" value="Aug" />
                <Picker.Item label="Sep" value="Sep" />
                <Picker.Item label="Oct" value="Oct" />
                <Picker.Item label="Nov" value="Nov" />
                <Picker.Item label="Dec" value="Dec" />
            </Picker>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Ansiotulo" value="Ansiotulo" />
                <Picker.Item label="Pääomatulo" value="Pääomatulo" />
                <Picker.Item label="MuutTulot" value="MuutTulot" />
            </Picker>
            <TextInput
                numberOfLines={1}
                onChangeText={amount => setAmount(amount)}
                value={amount}
                style={{ padding: 10 }}
                placeholder="Amount"
                numericvalue
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
                            <Text style={styles.listItems}>{item.name} {item.month}</Text>
                            <Text style={styles.textAmount}>{item.amount} €</Text>
                            <Button icon={<Icon name="trash-o" color="white" size={30} />} buttonStyle={styles.buttonDelete} onPress={() => handleDelete(item, 'income')} />
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
}
