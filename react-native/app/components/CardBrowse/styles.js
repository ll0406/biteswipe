import { StyleSheet, Dimensions } from 'react-native';


export const styles = StyleSheet.create({
  card: {
    elevation: 4,
    alignItems: 'center',
    width: Dimensions.get('window').width*.85,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 24,
    padding: 16,
    position: "absolute",
    top: 300
  },
  cardImage: {
    width: 350, 
    height: 350,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  }
})
