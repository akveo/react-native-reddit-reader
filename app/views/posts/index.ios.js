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
var PostView = require('../post');
var Comments = require('../comments');
var commentsIcon = require('./images/comments.png');

var PostsView = React.createClass({

  getInitialState: function() {
    return {
      posts: [],
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
          posts: posts,
          loading: false
        });
      })
  },

  loadMore: function () {
    this.setState({loading: true});
    return redditApi.fetchNext(this.getLastPost().name)
      .then(posts => {
        this.setState({
          posts: this.state.posts.concat(posts),
          loading: false
        });
      })
  },

  getLastPost: function () {
    return this.state.posts[this.state.posts.length - 1];
  },

  render() {
    return (<PostList posts={this.state.posts} loadMore={this.loadMore} navigator={this.props.navigator}/>);
  }
});

var PostList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.posts),
      loading: true
    };
  },

  componentWillUpdate: function (nextProps) {
    this.state.dataSource = this.getDataSource(nextProps.posts);
  },

  getDataSource: function(posts): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(posts);
  },

  renderPost(rowData, sectionID, rowID) {
    return (
      <Post post={rowData} navigator={this.props.navigator}></Post>
    )
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
        canLoadMore={true}
        isLoadingMore={this.state.loading}
        refreshOnRelease={true}
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        onLoadMoreAsync={this.props.loadMore}
        />
    );
  }
});

var Post = React.createClass({
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
      component: PostView,
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

module.exports = PostsView;