var baseUrl =  'https://www.reddit.com/';
var jsonPostfix = '.json';

module.exports = {
  fetchHot: function () {
    return fetch(baseUrl + jsonPostfix)
      .then((response) => response.json())
      .then((responseJson) => responseJson.data.children.map(c => c.data));
  }
};