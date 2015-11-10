var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Dimensions,
  TouchableHighlight,
  } = React;

var InfiniteScrollView = require('react-native-infinite-scroll-view');

var styles = require('./styles');
var redditApi = require('../../api/reddit');
var Post = require('../post');
var Comments = require('../comments');

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

var PostsView = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loading: true
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    this.setState({loading: true});
    return redditApi.fetchHot()
      .then(posts => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(posts),
          loading: false
        });
      })
  },

  loadMore: function () {
    this.setState({loading: true});
    return redditApi.fetchNext(this.getLastPost().name)
      .then(posts => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.getPosts().concat(posts)),
          loading: false
        });
      })
  },

  getLastPost: function () {
    return this.getPosts()[this.state.dataSource.getRowCount() - 1];
  },

  getPosts: function () {
    return this.state.dataSource._dataBlob.s1;
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <PostRow post={rowData} navigator={this.props.navigator}></PostRow>
    )
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        canLoadMore={true}
        isLoadingMore={this.state.loading}
        refreshOnRelease={true}
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        onLoadMoreAsync={this.loadMore}
        />
    );
  }
});

module.exports = PostsView;