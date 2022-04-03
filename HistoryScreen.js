import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { React } from 'react';

export default function HistoryScreen() {

    return (
        <View style={styles.container}>
            <Text>History page</Text>
            <StatusBar style="auto" />
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
