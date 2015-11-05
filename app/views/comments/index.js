var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var styles = require('./styles');
var redditApi = require('../../api/reddit');
var moment = require('moment');
var he = require('he');
var ParseHTML = require('../../ParseHTML');


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
      repliesShown: false
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.author}>{moment(this.props.comment.created*1000).fromNow()} by {this.props.comment.author}</Text>
        <View style={styles.postDetailsContainer}>
          <Text>{this.props.comment.body && he.unescape(this.props.comment.body)}</Text>
          <Text style={styles.author}>
            score {this.props.comment.score || 0} | {this.props.comment.author}
          </Text>
          {this.props.comment.replies && this._renderRepliesSection()}
          <View style={styles.separator}/>
        </View>
      </View>
    );
  },

  _renderRepliesSection: function () {
    return (
      <View>
        <TouchableHighlight onPress={this._toggleReplies}>
          <Text>Show replies</Text>
        </TouchableHighlight>
        {this.state.repliesShown && this._renderReplies()}
      </View>
    )
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

  render: function() {
    return (
      <View style={styles.container}>
        {this.renderComments()}
      </View>
    )
  },

  fetchData: function() {
    redditApi.fetchComments(this.props.post)
      .then(comments => {
        console.log(comments);
        comments.sort((a,b) => b.score - a.score);
        this.comments = comments;
        this.setState({
          loaded: true
        });
      })
      .done();
  },

  renderComments: function () {
    return this.comments ? (<CommentsList comments={this.comments}></CommentsList>) : '';
  }

});


module.exports = CommentsView;
