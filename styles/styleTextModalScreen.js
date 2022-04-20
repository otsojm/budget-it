import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        margin: 10
    },
    modalView: {
        margin: 20,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingTop: 200
    },
    button: {
        borderRadius: 20,
        padding: 10,
        width: 100,
        margin: 5
    },
    buttonClose: {
        backgroundColor: "red",
    },
    buttonOpen: {
        backgroundColor: "green",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
