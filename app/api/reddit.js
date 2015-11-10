var baseUrl =  'https://www.reddit.com/';
var jsonPostfix = '.json';

function beutifyReplies(comments) {
  return comments.map(comment => {
    comment.replies = comment.replies ? comment.replies.data.children.map(reply => reply.data).filter(c => c.body) : [];
    beutifyReplies(comment.replies);
    return comment;
  })
}

function postsResponseToJson(response) {
  return response.json()
  .then((responseJson) => responseJson.data.children.map(c => c.data))
}

module.exports = {
  fetchHot: function () {
    return fetch(baseUrl + jsonPostfix)
      .then(postsResponseToJson);
  },
  fetchNext(lastPostName) {
    return fetch(baseUrl + jsonPostfix +'?count=' + 25 + '&after=' + lastPostName)
      .then(postsResponseToJson);
  },
  fetchComments: function (post) {
    var url = baseUrl + post.permalink + jsonPostfix;
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => responseJson[1].data.children.map(c => c.data).filter(c => c.body))
      .then(beutifyReplies)
  }
};