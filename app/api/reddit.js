var baseUrl =  'https://www.reddit.com/';
var jsonPostfix = '.json';

function beutifyReplies(comments) {
  return comments.map(comment => {
    comment.replies = comment.replies ? comment.replies.data.children.map(reply => reply.data) : [];
    comment.replies && beutifyReplies(comment.replies);
    return comment;
  });

}

module.exports = {
  fetchHot: function () {
    return fetch(baseUrl + jsonPostfix)
      .then((response) => response.json())
      .then((responseJson) => responseJson.data.children.map(c => c.data));
  },
  fetchComments: function (post) {
    var url = baseUrl + post.permalink + jsonPostfix;
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => responseJson[1].data.children.map(c => c.data))
      .then(beutifyReplies)
  }
};