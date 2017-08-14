// - Import react components
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    banner: {
        minHeight: 100
    },
    avatarLayout: {
        position: 'relative',
        flex: 1,
        height: 60
    },
    avatarContainer: {
        backgroundColor: '#ffffff',
        borderRadius: (74 * 0.5),
        width: 74,
        height: 74,
        position: 'absolute',
        top: -40,

    },
    avatar: {
        transform: [
            { translateX: 2 },
            { translateY: 2 }
        ]
    },
    name: {
        position: 'relative',
        padding: 5,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    nameText: {
        fontWeight: '500',
        fontSize: 20
    },
    tagLine: {
        position: 'relative',
        padding: 5,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    tagLineText: {
        fontWeight: '100'
    }
})
export default styles