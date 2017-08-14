// - Import react components
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    commentShow: {
        position: 'absolute',
        backgroundColor: "#f9f9f9",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 15,
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
    name: {
        fontSize: 12
    },
    textLayout: {
        flexDirection: 'row',
        height: 20
    },
    text: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#212121',
        fontSize: 12
    },
    date: {
        position: 'absolute',
        right: 3,
        top: 3,
        fontSize: 10
    }
})
export default styles