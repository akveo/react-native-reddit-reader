var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var InfiniteScrollView = require('react-native-infinite-scroll-view');

var styles = require('./styles');
var redditApi = require('../../api/reddit');
var PostRow = require('./elements/postRow');

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