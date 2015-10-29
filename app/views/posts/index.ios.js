var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var styles = require('./styles');

var PostsView = React.createClass({
  render: function () {
    return (
      <Text style={styles.text}> Hello wor111ld! </Text>
    );
  }
});

module.exports = PostsView;