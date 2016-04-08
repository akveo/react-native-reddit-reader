var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  ActivityIndicatorIOS
  } = React;

var styles = require('./styles');
var redditApi = require('../../api/reddit');
var moment = require('moment');
var he = require('he');
var ParseHTML = require('../../ParseHTML');
var disclosure90= require('./images/disclosure90.png');
var disclosure = require('./images/disclosure.png');

var CommentsView = React.createClass({
  comments: [],

  getInitialState: function () {
    return {
      loaded: false
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    redditApi.fetchComments(this.props.post)
      .then(comments => {
        comments.sort((a,b) => b.score - a.score);
        this.comments = comments;
        this.setState({
          loaded: true
        });
      })
      .done();
  },

  renderComments: function () {
    return <CommentsList comments={this.comments}></CommentsList>;
  },

  renderLoader: function () {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicatorIOS style={styles.activityIndicator} size="large" color="#48BBEC" />
      </View>
    )
  },

  render: function() {
    return (
      <View style={[styles.container, styles.viewContainer]}>
        {this.state.loaded ? this.renderComments() : this.renderLoader()}
      </View>
    )
  },
});

var CommentsList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.comments),
    };
  },

  componentWillUpdate: function (nextProps) {
    this.state.dataSource = this.getDataSource(nextProps.comments);
  },

  getDataSource: function(comments): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(comments);
  },

  render: function() {
    return (
     <ListView
       style={styles.container}
       dataSource={this.state.dataSource}
       renderRow={this.renderComment}
       />
    );
  },

  renderComment: function(comment) {
    return (
      <Comment comment={comment}/>
    )
  }
});

var Comment = React.createClass({
  getInitialState: function () {
    return {
      repliesShown: true
    }
  },

  render: function() {
    return (
      <View style={styles.comment}>
        <View style={styles.rowContainer}>
          <Text style={styles.author}>{this.props.comment.author + ' '}</Text>
          <Text style={styles.pointsAndTime}>{this.props.comment.score || 0} points {moment(this.props.comment.created_utc*1000).fromNow()}</Text>
        </View>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.commentBody}>{this.props.comment.body && he.unescape(this.props.comment.body)}</Text>
          {this.props.comment.replies && this._renderRepliesSection()}
        </View>
      </View>
    );
  },

  _renderRepliesSection: function () {
    var repliesSection = this.props.comment.replies.length ?
      (<View>
        <View style={styles.rowContainer}>
          <Text onPress={this._toggleReplies} style={styles.repliesBtnText}>
            replies ({this.props.comment.replies.length})
          </Text>
          <Image
            style={[styles.disclosure, styles.muted]}
            source={this.state.repliesShown ? disclosure90 : disclosure}
          />
        </View>
          {this.state.repliesShown && this._renderReplies()}
      </View>) : <View/>;
    return repliesSection;
  },

  _toggleReplies: function () {
    this.setState({
      repliesShown: !this.state.repliesShown
    })
  },

  _renderReplies: function () {
    return (
      <View style={styles.repliesContainer}>
        <CommentsList comments={this.props.comment.replies}></CommentsList>
      </View>
    )
  }
});

module.exports = CommentsView;
