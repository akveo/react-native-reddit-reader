var React = require('react-native');

var {
  StyleSheet,
  PixelRatio
  } = React;

module.exports = StyleSheet.create({
  container: {
    flex:1,
  },
  viewContainer: {
    paddingTop: 64,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  author: {
    fontSize: 10,
    color: '#48BBEC',
    fontWeight: 'bold',
  },
  pointsAndTime: {
    fontSize: 10,
    color: 'lightslategray'
  },
  comment: {
    flex: 1,
    margin: 5,
    marginBottom: 10,
    paddingLeft: 4,
    borderLeftColor: '#CACACA',
    borderLeftWidth: 1 / PixelRatio.get(),
  },
  commentBody: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 11,
    color: '#444444'
  },
  repliesBtnText: {
    fontSize: 10,
    color: 'lightslategray',
  },
  repliesContainer: {
    flex: 1,
    marginLeft: 5,
    marginTop: 5
  },
  disclosure: {
    width: 9,
    height: 8,
    marginLeft: 2,
    marginRight: 8,
    marginTop: 3
  },
  muted: {
    opacity: 0.6,
  },
  activityIndicator: {
    height: 80
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
