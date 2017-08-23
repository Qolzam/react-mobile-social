import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1
  },
  input: {
    height: 100,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    fontSize: 14
  },
  header: {
    backgroundColor: "#ffffff"
  },
  headerRight: {
    marginRight: 10
  },
  userInfo: {
    flexDirection: 'row',
    padding: 8
  },
  name: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:12,
    paddingRight:12

  },
  camerIcon: {
    color: '#757575',
    margin: 7,
    backgroundColor: "transparent"
  },
  keyboardIcon: {
    color: '#757575',
    margin: 7,
    backgroundColor: "transparent"
  },
  removeImage: {
    backgroundColor: '#eeeeee',
    borderRadius: (24 * 0.5),
    width: 24,
    height: 24,
    position: 'absolute',
    zIndex: 5,
    top: 3,
    right: 3
  },
  removeImageIcon: {
    color: '#757575',
    margin: 2,
    backgroundColor: "transparent"
  }
})
