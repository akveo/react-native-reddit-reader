var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var {
  RefresherListView,
  LoadingBarIndicator
  } = require('react-native-refresher');

var styles = require('./styles');
var redditApi = require('../../api/reddit');
var PostRow = require('./elements/postRow');

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
    return redditApi.fetchHot()
      .then(posts => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(posts),
          loaded: true
        });
      })
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <PostRow post={rowData} navigator={this.props.navigator}></PostRow>
    )
  },

  render() {
    return (
      <RefresherListView
        dataSource={this.state.dataSource}
        onRefresh={this.fetchData}
        renderRow={this.renderRow.bind(this)}
        indicator={<LoadingBarIndicator />}
        refreshOnRelease={true}
        />
    );
  }
});

module.exports = PostsView;