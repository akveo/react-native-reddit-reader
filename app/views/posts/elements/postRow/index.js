var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  } = React;

var styles = require('./styles');
var Post = require('../../../post');
var Comments = require('../../../comments');

var PostRow = React.createClass({

  render: function() {
    var thumbnail = this.props.post.preview && this.props.post.preview.images[0].source;
    var imageEl = this._getImageElement(thumbnail)
    return (
      <TouchableHighlight onPress={this.showPost}>
        <View style={styles.container}>
          <View style={styles.postDetailsContainer}>
            <Text style={styles.postTitle}>
              {this.props.post.title}
            </Text>
            {imageEl}
            <Text style={styles.postInfo} onPress={this.showComments}>
              score {this.props.post.score || 0} | comments: {this.props.post.num_comments || 0} | by {this.props.post.author}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  showPost: function () {
    this.props.navigator.push({
      title: this.props.post.title,
      component: Post,
      passProps: {url: this.props.post.url}
    });
  },

  showComments: function () {
    this.props.navigator.push({
      title: 'Comments - ' + this.props.post.title,
      component: Comments,
      passProps: {post: this.props.post}
    });
  },

  _getImageElement: function (image) {
    return image ?
      ( <View style={styles.imageContainer}>
        <Image
          style={this._getImageStyle(image)}
          source={{uri: image.url}}
          />
      </View>) :
      ( <View/>);
  },

  _getImageStyle: function (image) {
    var width = Math.min(Dimensions.get('window').width, image.width);
    var height = image.height * width / image.width;
    return {width: width, height: height};
  }
});

module.exports = PostRow;
