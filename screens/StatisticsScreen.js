import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from "react-native-chart-kit";
import React, { useState } from 'react';

import { returnExpenses, returnIncomes } from '../connections/firebase';

import { styles } from '../styles/styleStatistics';

export default function StatisticsScreen() {
    const [expenses, setExpenses] = useState([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    const [incomes, setIncomes] = useState([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    const [status, setStatus] = useState({ total: 0.0, categories: [{ Ansiotulo: 0.0, Pääomatulo: 0.0, MuutTulot: 0.0, Ruokakauppa: 0, Elektroniikka: 0, MuutMenot: 0 }] });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[new Date().getMonth()];

    /* Get income/expense data from Firebase and sort them by month and category. */
    async function getData() {
        let expense = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        let income = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        let result = [];
        let total = [{ total: 0.0, categories: [{ Ansiotulo: 0.0, Pääomatulo: 0.0, MuutTulot: 0.0, Ruokakauppa: 0, Elektroniikka: 0, MuutMenot: 0 }] }];
        setExpenses([]);
        setIncomes([]);

        result = await returnExpenses();
        if (result.length > 0) {
            result.forEach(item => {
                expense[months.indexOf(item.month)] = parseFloat(expense[months.indexOf(item.month)]) + parseFloat(item.amount) / 1000;
                if (item.month == month) {
                    total[0].total -= parseFloat(item.amount);
                    total[0].categories[0][item.name] -= parseFloat(item.amount);
                }
            });
            setExpenses(expense);
        }

        result = await returnIncomes();
        if (result.length > 0) {
            result.forEach(item => {
                income[months.indexOf(item.month)] = parseFloat(income[months.indexOf(item.month)]) + parseFloat(item.amount) / 1000;
                if (item.month == month) {
                    total[0].total += parseFloat(item.amount);
                    total[0].categories[0][item.name] += parseFloat(item.amount);
                }
            });
            setIncomes(income);
        }
        setStatus(total[0]);
    };

    return (
        <View>
            <View>
                <Text>Expenses</Text>
                <LineChart
                    data={{
                        labels: months,
                        datasets: [
                            {
                                data: expenses
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={220}
                    yAxisLabel="€ "
                    yAxisSuffix=" k"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#a80f1c",
                        backgroundGradientFrom: "#a80f1c",
                        backgroundGradientTo: "#a80f1c",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
            <View>
                <Text>Incomes</Text>
                <LineChart
                    data={{
                        labels: months,
                        datasets: [
                            {
                                data: incomes
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={220}
                    yAxisLabel="€ "
                    yAxisSuffix=" k"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#32a852",
                        backgroundGradientFrom: "#32a852",
                        backgroundGradientTo: "#32a852",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
            <Button icon={<Icon name="cloud-download" color="white" size={30} />} buttonStyle={styles.buttonCloud} onPress={() => getData()} />
            <Text style={styles.statusContainer}>{status.total < 0.0 ? <Text>Olet tässä kuussa ({month}) {status.total.toFixed(2)} € yli budjetin.</Text> :
                <Text>Olet tässä kuussa ({month}) {status.total.toFixed(2)} € alle budjetin.</Text>}</Text>
            <Text style={styles.statusContainer}>{"\n"}<Text style={{ fontWeight: "bold" }}>Tulot {status.categories[0].Ansiotulo + status.categories[0].Pääomatulo +
                status.categories[0].MuutTulot} €{"\n"}</Text>
                <Text>Ansiotulo {status.categories[0].Ansiotulo} €{"\n"}</Text>
                <Text>Pääomatulo {status.categories[0].Pääomatulo} €{"\n"}</Text>
                <Text>Muut tulot {status.categories[0].MuutTulot} €{"\n"}</Text>
            </Text>
            <Text style={styles.statusContainer}>{"\n"}<Text style={{ fontWeight: "bold" }}>Menot {status.categories[0].Ruokakauppa + status.categories[0].Elektroniikka +
                status.categories[0].MuutMenot} €{"\n"}</Text>
                <Text>Ruokakauppa {status.categories[0].Ruokakauppa} €{"\n"}</Text>
                <Text>Elektroniikka {status.categories[0].Elektroniikka} €{"\n"}</Text>
                <Text>Muut menot {status.categories[0].MuutMenot} €{"\n"}</Text>
            </Text>
        </View>
    );
}
