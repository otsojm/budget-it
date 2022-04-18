import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { API_VALUE } from "@env";

import { uploadExpense } from '../connections/firebase';

export default function AddIncomeScreen() {
    const [selectedValue, setSelectedValue] = useState('01-M');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [item, setItem] = useState('');
    const [results, setResults] = useState([]);
    const [jobId, setJobId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let job_id = "";

    const handleExpense = () => {
        if (jobId == '') {
            uploadExpense(selectedValue, description, amount);
        } else {
            uploadExpense(selectedValue, item, Math.floor(results.min_price * 0.93));
        }
        setSelectedValue('01-M');
        setDescription('');
        setAmount(0);
        setItem('');
        setResults([]);
        setJobId(''); 
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
                onChangeText={description => setDescription(description)}
                value={description}
                style={{ padding: 10 }}
                placeholder="Description"
            />
            <TextInput
                onChangeText={amount => setAmount(amount)}
                value={amount}
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
                placeholder="Type search parameter in English and press Get data"
            />
            {results.min_price ?
                <Text style={{ marginLeft: 10 }}>{Math.floor(results.min_price * 0.93)} €</Text>
                : <Text style={{ marginLeft: 10 }}>No results currently.</Text>}
            <Button title="Get data" buttonStyle={{ margin: 5 }} onPress={() => getData()} />
            <Button title="Save" buttonStyle={{ margin: 5, backgroundColor: 'green' }} onPress={() => handleExpense()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    baseText: {
        fontSize: 15,
        margin: 10,
        paddingLeft: 140
    },
});
