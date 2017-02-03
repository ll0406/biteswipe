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
    alignItems: 'center',
    // justifyContent: 'center',
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
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
  },
  iconsBox: {
    backgroundColor: 'green',
    height: 40,
    minWidth: 40,
    marginLeft: 2,
    marginRight: 5,
    borderRadius: 5,
  },
  highlightsBoxIcon: {
    width:40, 
    height:40,
  },
  priceBox:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
    borderRadius: 2,
  },
  priceBold: {
    color: '#FFFFFF',
  },
  priceLight: {
    color: '#000000',
  
  },

  distanceDot: {
    marginLeft: 5,
    backgroundColor: 'orange',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'red'
  },

  distanceDotText: {
    lineHeight: 14
  },

  ratingView: {
  }


})
