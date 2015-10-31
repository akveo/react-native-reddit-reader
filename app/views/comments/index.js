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
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    redditApi.fetchComments(this.props.post)
      .then(comments => {
        console.log(comments);
        comments.sort((a,b) => b.score - a.score);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(comments),
          loaded: true
        });
      })
      .done();
  },

  renderRow(rowData, sectionID, rowID) {
    return (
     <Comment comment={rowData}/>
    )
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.author}>{moment(this.props.comment.created*1000).fromNow()} by {this.props.comment.author}</Text>
        <View style={styles.postDetailsContainer}>
          <ParseHTML
            code={this.props.comment.body_html && he.unescape(he.unescape(this.props.comment.body_html))}
            customTagToStyle={{'<div>':{}, '<p>': {}, '<a>': {textDecoration: 'underline'}}}
          />
          <Text style={styles.author} onPress={this.showComments}>
            score {this.props.comment.score || 0} | {this.props.comment.author}
          </Text>
          <View style={styles.separator}/>
        </View>
      </View>
    );
  },
});

module.exports = CommentsList;
