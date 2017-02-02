import { StyleSheet, Dimensions } from 'react-native';


export const styles = StyleSheet.create({
  swipeViewBackground: {
    backgroundColor: '#F0F0F0', 
    flex:1, 
    elevation:0  
  },
  cardWrapper: {
    flex:1, 
    marginTop: 45
  },
  card: {
    elevation: 2,
    alignItems: 'center',
    width: Dimensions.get('window').width*.85,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginTop:25
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
