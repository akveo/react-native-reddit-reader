var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
  } = React;

var styles = require('./styles');

var PostRow = React.createClass({

  render: function() {
    var thumbnail = this.props.post.preview && this.props.post.preview.images[0].source;
    var imageEl = thumbnail ?
      ( <View style={styles.imageContainer}>
          <Image
            style={this._getImageStyle(thumbnail)}
            source={{uri: thumbnail.url}}
          />
        </View>) :
      ( <View/>);
    console.log(this.props.post);
    return (
      <TouchableHighlight>
        <View style={styles.container} onLayout={this.onLayout}>
          <View style={styles.postDetailsContainer}>
            <Text style={styles.postTitle}>
              {this.props.post.title}
            </Text>
            {imageEl}
            <Text style={styles.postInfo}>
              score {this.props.post.score || 0} | comments: {this.props.post.num_comments || 0} | by {this.props.post.author}
            </Text>
            <View style={styles.separator}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _getImageStyle: function (image) {
    var width = Math.min(Dimensions.get('window').width, image.width);
    var height = image.height * width / image.width;
    return {width: width, height: height};
  }
});

module.exports = PostRow;
