import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomColor: '#000000'
    },
    picker: {
        height: 50,
        width: 150,
        marginLeft: 140
    },
    buttonStyle: {
        margin: 10,
        width: 100,
        marginLeft: 150,
        backgroundColor: 'green'
    },
    listContainer: {
        flexDirection: 'row',
        bottom: 5
    },
    textName: {
        margin: 10,
        marginLeft: 70
    },
    textAmount: {
        margin: 10,
        marginLeft: 70
    },
    listItems: {
        width: 400,
        height: 20,
        resizeMode: 'contain',
        margin: 10,
        borderTopWidth: 1
    },
    buttonDelete: {
        margin: 3,
        marginLeft: 140,
        width: 60,
        left: 180,
        borderRadius: 20,
        backgroundColor: 'red'
    },
    buttonSave: {
        margin: 10,
        marginLeft: 90,
        width: 100,
        backgroundColor: 'green'
    },
    buttonCloud: {
        margin: 10,
        marginLeft: 25,
        width: 100
    }
});
