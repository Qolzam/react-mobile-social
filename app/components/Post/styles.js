// - Import react components
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    post: { margin: 0 },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    name: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 10
    },
    nameText: {
        textAlign: 'justify',
        borderRightWidth: 30,
    },
    dateText: {
        fontSize: 10
    },
    body: {
        padding: 10
    },
    bodyText: {
        fontWeight: '100'
    },
    footer: {
        flexDirection: 'row',
        marginTop: 10
    },
    footerLeft: {
        flex: 1
    },
    favorite: {
        backgroundColor: '#eeeeee',
        borderRadius: (33 * 0.5),
        width: 33,
        height: 33
    },
    favoriteIcon: {
        color: '#757575',
        margin: 7,
        backgroundColor: "transparent"
    },
    footerRight: {
        flexDirection: 'row'
    },
    comment: {
        backgroundColor: '#eeeeee',
        borderRadius: (33 * 0.5),
        width: 33,
        height: 33
    },
    commentIcon: {
        color: '#757575',
        margin: 7,
        backgroundColor: "transparent"
    },
    share: {
        backgroundColor: '#eeeeee',
        borderRadius: (33 * 0.5),
        width: 33,
        height: 33,
        marginLeft: 8
    },
    shareIcon: {
        color: '#757575',
        margin: 7,
        backgroundColor: "transparent"
    }
})
export default styles