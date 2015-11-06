/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var PostsView = require('./app/views/posts');

var ReactNativeRedditReader = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#48BBEC'
        titleTextColor='#48BBEC'
        translucent={true}
        initialRoute={{
          title: 'REDDIT',
          component: PostsView,
        }}/>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('ReactNativeRedditReader', () => ReactNativeRedditReader);
