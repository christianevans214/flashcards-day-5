app.controller('AddCard', function ($scope, FlashCardFactory, $rootScope) {
	$scope.resetCard = function () {
		$scope.newCard = {
			answers: [{
				correct: true
			}, {
				correct: false
			}, {
				correct: false
			}]
		};
	}

	$scope.setCorrect = function (givenAnswer) {
		$scope.newCard.answers.forEach(function (a) {
			a.correct = false;
		});
		givenAnswer.correct = true;
	};

	$scope.postFlashCard = function () {
		FlashCardFactory.create($scope.newCard)
		.then(function (card) {
			$scope.resetCard();
			$rootScope.$broadcast('addedCard', card);
			console.log('$scope', $scope);
		});
	};

	// // failed attempt at validation
	// setTimeout(function () {
	// 	console.log($scope.cardForm);
	// 	$scope.cardForm.correctAnswer.$validators.noSameText = function () {
	// 		var texts = [];
	// 		return $scope.newCard.answers.reduce(function (isValid, answer) {
	// 			if (!isValid) return false;
	// 			if (texts.indexOf(answer.text) == -1) {
	// 				texts.push(answer.text);
	// 				return true;
	// 			} else return false;
	// 		}, true);
	// 	};
	// }, 100);

	$scope.resetCard();
});