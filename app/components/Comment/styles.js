// - Import react components
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    comment: {
        position: 'absolute',
        backgroundColor: "#f9f9f9",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    date: {
        fontSize: 10
    }
})
export default styles