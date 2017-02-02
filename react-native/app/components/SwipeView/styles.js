import { StyleSheet, Dimensions } from 'react-native';


const {width, height} = Dimensions.get('window');

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
    justifyContent: 'center',
    width: width*.85,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginTop:25
  },
  cardContent: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  cardTitle: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 24,
    padding: 16,
    position: "absolute",
    top: 300
  },
  cardSubTitle: {
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0
  },
  cardImage: {
    width: 350, 
    height: 350,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  highlightsBox: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'red'
  }
})
