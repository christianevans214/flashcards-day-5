var app = angular.module('FlashCardApp', ['ui.router']);

app.config(function($stateProvider) {
  $stateProvider
    .state("statisticsPanel", {
      url: "/stats",
      controller: "StatsController",
      templateUrl: "/uiRouterConfig/statsPanelTemplate.html"
    })
    .state("newCardForm", {
      url: "/newCardForm",
      controller: "AddCard",
      templateUrl: "/uiRouterConfig/newCardTemplate.html"
    })
    .state("flashCards", {
      url: "/flashCards",
      templateUrl: "/uiRouterConfig/flashCardTemplate.html"
    })
    .state("manage", {
      url: "/manage/:id",
      controller: "ManageCard",
      templateUrl: "/uiRouterConfig/editCardTemplate.html"
    })
    .state("manage.delete", {
      url: "/delete",
      controller: "DeleteCard",
      template: "<h1>Are you sure you want to delete this card?</h1> <button ng-click='yesDelete(newCard._id)'>Yes!</button> <a ui-sref='manage({id: newCard._id})'><button>No!</button>"
    })
  console.log($stateProvider);
})

app.controller("ManageCard", function($scope, $http, $stateParams) {
  $scope.newCard = {
    answers: [{
      correct: true
    }, {
      correct: false
    }, {
      correct: false
    }]
  };

  $scope.updateCard = function(card) {
    console.log(card);
    $http.put("/update", card)
      .then(function(data) {
        console.log(data);
        window.location.href = './';

      })
  }

  console.log($stateParams)
  $http.get("/manage/card", {
      params: $stateParams
    })
    .then(function(data) {
      $scope.newCard = data.data;
    })
})

app.controller("DeleteCard", function($scope, $http, $stateParams) {
  console.log("junk");

  $scope.yesDelete = function(cardId) {
    $http.delete("/manage/card", {
        params: {
          _id: cardId
        }
      })
      .then(function(data) {
        console.log(data);
        window.location.href = './';
      })
  }
})