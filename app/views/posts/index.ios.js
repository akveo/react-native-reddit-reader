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
var PostRow = require('./elements/postRow')

var PostsView = React.createClass({

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
    redditApi.fetchHot()
      .then(posts => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(posts),
          loaded: true
        });
      })
      .done();
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <PostRow post={rowData}></PostRow>
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

module.exports = PostsView;