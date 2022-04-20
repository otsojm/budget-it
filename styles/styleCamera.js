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
    previewContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 310,
        left: 10,
        margin: 40
    },
    buttonFlip: {
        margin: 3,
        width: 100,
        backgroundColor: 'purple'
    },
    buttonTake: {
        margin: 3,
        width: 100
    },
    buttonExit: {
        margin: 3,
        width: 100,
        backgroundColor: 'green'
    }
});
