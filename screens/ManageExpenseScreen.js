import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { API_VALUE } from "@env";
import Icon from 'react-native-vector-icons/FontAwesome';

import { uploadExpense, returnExpenses, deleteItem } from '../connections/firebase';

import { styles } from '../styles/styleExpenses';

export default function AddIncomeScreen() {
    const [selectedValue, setSelectedValue] = useState('01-M Ruokakauppa');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [item, setItem] = useState('');
    const [results, setResults] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [jobId, setJobId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let job_id = "";

    const handleExpense = () => {
        if (jobId == '') {
            uploadExpense(selectedValue, description, amount);
        } else {
            uploadExpense(selectedValue, item, Math.floor(results.min_price * 0.93));
        }
        setSelectedValue('01-M Ruokakauppa');
        setDescription('');
        setAmount(0);
        setItem('');
        setResults([]);
        setJobId('');
    };

    async function getExpenses() {
        let result = [];
        setExpenses([]);

        result = await returnExpenses();
        if (result.length > 0) {
            setExpenses(result);
        }
    };

    const handleDelete = async (uri, parameter) => {
        deleteItem(uri, parameter);
    };

    async function getData() {
        setResults([]);
        setIsLoading(true);

        await fetch("https://api.priceapi.com/v2/jobs", {
            body: `token=${API_VALUE}&country=us&source=google_shopping&topic=search_results&key=term&max_age=43200&max_pages=1&sort_by=ranking_descending&condition=any&min_price=1&max_price=1000&values=` + item,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
            .then(response => response.json())
            .then(data => job_id = data.job_id);

        setJobId(job_id)

        setTimeout(async () => {
            await fetch("https://api.priceapi.com/v2/jobs/" + job_id + `/download?token=${API_VALUE}`)
                .then(response => response.json())
                .then(data => setResults(data.results[0].content.search_results[0]));

            setIsLoading(false);
        }, 20000);
    };

    return (
        <View
            style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="01-M Ruokakauppa" value="01-M Ruokakauppa" />
                <Picker.Item label="02-M Elektroniikka" value="02-M Elektroniikka" />
                <Picker.Item label="03-M Muu" value="03-M Muu" />
            </Picker>
            <TextInput
                multiline
                numberOfLines={4}
                onChangeText={description => setDescription(description)}
                value={description}
                style={{ padding: 10 }}
                placeholder="Description"
            />
            <TextInput
                onChangeText={amount => setAmount(parseInt(amount))}
                value={parseInt(amount)}
                style={{ padding: 10 }}
                placeholder="Amount"
                keyboardType="numeric"
            />
            <Text style={styles.baseText}>
                <Text>OR</Text>
            </Text>
            {isLoading ?
                <View>
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text style={{ marginLeft: 10, fontStyle: 'italic' }}>Please wait up to 20 seconds.</Text>
                </View>
                : null}
            <TextInput
                numberOfLines={1}
                onChangeText={item => setItem(item)}
                value={item}
                style={{ padding: 10 }}
                placeholder="Type search parameter in English and press search"
            />
            {results.min_price ?
                <Text style={{ marginLeft: 10 }}>{Math.floor(results.min_price * 0.93)} €</Text>
                : <Text style={{ marginLeft: 10 }}>No results currently.</Text>}
            <ScrollView>
                <FlatList
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={expenses}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <Text style={styles.listItems}>{item.name}</Text>
                            <Text style={styles.textDescription}>{item.description}</Text><Text style={styles.textAmount}>{item.amount} €</Text>
                            <Button icon={<Icon name="trash-o" color="white" size={30} />} buttonStyle={styles.buttonDelete} onPress={() => handleDelete(item, 'expense')} />
                        </View>
                    )}
                />
            </ScrollView>
            <View style={styles.listContainer}>
                <Button icon={<Icon name="search" color="white" size={30} />} buttonStyle={styles.buttonSearch} onPress={() => getData()} />
                <Button icon={<Icon name="save" color="white" size={30} />} buttonStyle={styles.buttonSave} onPress={() => handleExpense()} />
                <Button icon={<Icon name="cloud-download" color="white" size={30} />} buttonStyle={styles.buttonCloud} onPress={() => getExpenses()} />
            </View>
        </View>
    );
}
