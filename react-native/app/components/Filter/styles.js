import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 10
  },
  radiusText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    margin: 20
  },
  slider: {
    height: 20,
    margin: 20,
  },
  priceText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    margin: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  buttonEnabled: {
    backgroundColor: "#841584",
    height: width / 4 - 5,
    width: width / 4 - 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: 'grey',
    height: width / 4 - 5,
    width: width / 4 - 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  updateContainer: {
    marginTop: 20
  }
});

module.exports = styles;