'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  WebView
  } = React;

var styles = require('./styles');

var PostView = React.createClass({

  render: function() {
    return (
     <View style={styles.container}>
       <WebView
         automaticallyAdjustContentInsets={true}
         url={this.props.url}
         javaScriptEnabledAndroid={true}
         scalesPageToFit={true}
         />
     </View>
    );
  }
});

module.exports = PostView;
