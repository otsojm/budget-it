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
    baseText: {
        fontSize: 15,
        margin: 10,
        paddingLeft: 140
    },
    listItems: {
        width: 400,
        height: 20,
        resizeMode: 'contain',
        margin: 10,
        borderTopWidth: 1
    },
    listContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5
    },
    textDescription: {
        margin: 10,
        marginLeft: 70,
        fontStyle: 'italic'
    },
    textAmount: {
        margin: 10,
        marginLeft: 70
    },
    buttonDelete: {
        margin: 3,
        marginLeft: 140,
        width: 60,
        left: 180,
        borderRadius: 20,
        backgroundColor: 'red'
    },
    buttonSearch: {
        margin: 10,
        marginLeft: 25,
        width: 100,
        backgroundColor: 'purple'
    },
    buttonSave: {
        margin: 10,
        marginLeft: 25,
        width: 100,
        backgroundColor: 'green'
    },
    buttonCloud: {
        margin: 10,
        marginLeft: 25,
        width: 100
    }
});
