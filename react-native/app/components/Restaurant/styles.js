import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    elevation: 2,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  card: {
    elevation: 2,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 15
  },
  cardTitle: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 24,
    padding: 8,
    position: 'absolute',
    top: 300
  },
  container: {
    flex: 1
  },
  cardImage: {
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').height*.5
  },
  reviewImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  tab: {
    flex: 1,
    height: 850,
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
    marginLeft: 40
  },
  pushDown: {
    marginTop: 12
  }
})
