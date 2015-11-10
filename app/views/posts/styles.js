var React = require('react-native');

var {
  StyleSheet,
  PixelRatio
  } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  postTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#444444'
  },
  postStats: {
    marginTop: 6,
    marginLeft: 5,
    flexDirection: 'row'
  },
  statsTextStyles: {
    color: 'lightslategray',
    fontSize: 10,
    textAlign: 'left'
  },
  commentsSection: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  commentsIcon: {
    width: 15,
    height: 15,
    opacity: 0.3,
  },
  readComments: {
    position: 'relative',
    bottom: 2
  },
  blue: {
    color: '#48BBEC',
    fontWeight: 'bold'
  },
  dotDelimeter: {
    position: 'relative',
    bottom: 2
  },
  dotDelimeterText: {
    color: 'lightslategray',
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    height: 1/PixelRatio.get(),
    backgroundColor: '#CACACA',
  },
});