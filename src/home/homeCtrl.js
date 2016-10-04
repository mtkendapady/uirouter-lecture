angular.module( "Starship" )
	.controller( "homeCtrl", function( $scope, starshipService, $location, $anchorScroll, characters ) {
		$scope.people = [];

		// $scope.getPeople = function() {
		// 	starshipService
		// 		.getCharacters()
		// 		.then( function( people ) {
		// 			$scope.people = people.data.results;
		// 			console.log( people.data );
		// 		} );
		// }
		// $scope.getPeople();

		$scope.people = characters;
		console.log( $scope.people );

		$scope.getNextPage = function() {
			starshipService
				.getNextPage()
				.then( function( people ) {
					$scope.people = people;
					// $scope.people = characters;
					$location.hash( 'top' );
					$anchorScroll();
				} );
		}

	} );
