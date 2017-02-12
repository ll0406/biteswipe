import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 16
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  }
});

module.exports = styles;