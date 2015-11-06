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

var commentsIcon = require('image!comments');

var PostRow = React.createClass({

  render: function() {
    var thumbnail = this.props.post.preview && this.props.post.preview.images[0].source;
    var imageEl = this._getImageElement(thumbnail);
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={this.showPost}>
              <View style={styles.container}>
                <Text style={styles.postTitle}>
                  {this.props.post.title}
                </Text>
                {imageEl}
                <View style={styles.postStats} onPress={this.showComments}>
                  <Text style={styles.statsTextStyles}>{this.props.post.score || 0} points</Text>
                  <View style={styles.dotDelimeter}><Text style={styles.statsTextStyles}> . </Text></View>
                  <Text style={styles.statsTextStyles}>{this.props.post.num_comments || 0} comments</Text>
                  <View style={styles.dotDelimeter}><Text style={styles.statsTextStyles}> . </Text></View>
                  <Text style={[styles.statsTextStyles, styles.blue]}>{'/r/' + this.props.post.subreddit}</Text>
                  <View style={styles.dotDelimeter}><Text style={styles.statsTextStyles}> . </Text></View>
                  <Text style={[styles.statsTextStyles, styles.blue]}>{this.props.post.author}</Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.showComments}>
              <View style={[styles.container, styles.commentsSection]} onPress={this.showComments}>
                <Image
                  style={styles.commentsIcon}
                  source={commentsIcon}
                  />
                <View style={styles.readComments}>
                  <Text style={[styles.statsTextStyles]}>  Read comments</Text>
                </View>
              </View>
            </TouchableHighlight>
            <View style={styles.separator}/>
        </View>
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
    var width = Dimensions.get('window').width;
    var height = image.height * width / image.width;
    return {width: width, height: height};
  }
});

module.exports = PostRow;
