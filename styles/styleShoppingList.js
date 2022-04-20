import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    listContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5
    },
    buttonLeft: {
        margin: 2,
        marginLeft: 20,
        borderRadius: 100
    },
    buttonRight: {
        margin: 2,
        marginLeft: 250,
        borderRadius: 100
    },
    buttonDelete: {
        margin: 2,
        marginLeft: 175,
        width: 60,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    listItems: {
        width: 260,
        height: 300,
        borderWidth: 2,
        borderColor: 'gray',
        resizeMode: 'contain',
        margin: 8,
        marginLeft: 70
    },
    listItemsText: {
        width: 250,
        height: 100,
        margin: 10,
        marginLeft: 70,
        borderTopWidth: 1
    }
});
