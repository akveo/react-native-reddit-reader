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
var Comment = require('./elements/comment');

var CommentsView = React.createClass({

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

module.exports = CommentsView;
