'use strict';

var React = require('react-native');

var {
  StyleSheet,
  } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  postDetailsContainer:{
    flex: 1,
  },
  postTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#48BBEC'
  },
  postInfo: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 4,
    textAlign: 'center',
    color: 'gray',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
});