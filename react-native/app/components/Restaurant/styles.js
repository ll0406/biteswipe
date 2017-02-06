import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    marginTop: 50,
    elevation: 2,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  card: {
    marginTop: 10,
    elevation: 2,
    backgroundColor: '#ffffff',
    padding: 10
  },
  cardTitle: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 24,
    padding: 5,
    position: 'absolute',
    top: 0
  },
  cardImage: {
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').height*.5
  },
  reviewImage: {
    width: 30,
    height: 30
  },
  tab: {
    flex: 1,
    padding: 15
  },
  tabTitle: {
    color: 'black'
  },
  reviewHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  reviewName: {
    marginLeft: 35
  },
  pushDown: {
    marginTop: 10
  }
})
