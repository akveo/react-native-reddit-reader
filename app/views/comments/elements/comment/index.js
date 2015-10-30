var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  } = React;

var styles = require('./styles');

var PostRow = React.createClass({

  render: function() {
    return (
        <View style={styles.container}>
          <View style={styles.postDetailsContainer}>
            <Text style={styles.body}>
              {this.props.comment.body}
            </Text>
            <Text style={styles.author} onPress={this.showComments}>
              score {this.props.comment.score || 0} | {this.props.comment.author}
            </Text>
            <View style={styles.separator}/>
          </View>
        </View>
    );
  },
});

module.exports = PostRow;/**
 * Created by Andrey_Grabowsky on 30.10.15.
 */
