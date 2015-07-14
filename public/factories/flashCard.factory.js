app.factory('FlashCardFactory', function ($http) {
    return {
      getFlashCards: function (cat) {
        var config = {};
        if (cat) config.params = {category: cat};
        return $http.get('/cards', config)
        .then(function (res) {
          return res.data;
        });
      },
      create: function (cardData) {
        return $http.post('/cards', cardData)
        .then(function (res) {
          return res.data;
        });
      },
      // Card: function () {
      //   this.answers = [{correct: true}, {correct: false}, {correct: false}];
      // }
    }
  })