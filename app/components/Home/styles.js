// - Import react components
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    tabIcon: {
        backgroundColor: "transparent"
    },
    spinnerLoding: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    textLoading: {
        marginTop: 10
    },
    createPostLayout: {
        bottom: 8,
        right: 8,
        backgroundColor: '#4CAF50',
        borderRadius: (44 * 0.5),
        width: 44,
        height: 44,
        marginLeft: 8,
        position: 'absolute'
    },
    createPostIcon: {
        color: '#ffffff',
        margin: 7,
        backgroundColor: "transparent"
    }
})
export default styles