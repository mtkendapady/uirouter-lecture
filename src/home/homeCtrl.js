angular.module( "Starship" )
.controller( "homeCtrl", function( $scope, starshipService, $location, $anchorScroll, characters ) {
	$scope.people = [];
	$scope.starships = [];

	$scope.characters = characters;
	console.log( $scope.characters );
	// $scope.getPeople = function() {
	// 	starshipService
	// 		.getCharacters()
	// 		.then( function( people ) {
	// 			$scope.people = people.data.results;
	// 			console.log( people.data );
	// 		} );
	// }
	// $scope.getPeople();

	$scope.getStarships = function( urlArray ) {
		console.log( "inside of homeCtrl.getStarships" );
		$scope.starships = [];
		starshipService
			.getStarships( urlArray )
			.then( function( starships ) {
				console.log( "inside of homeCtrl .then" );
				$scope.starships = starships;
			} );
	}

	$scope.getNextPage = function() {
		starshipService
			.getNextPage()
			.then( function( people ) {
				$scope.people = people.data.results;
        $location.hash('top');
        $anchorScroll();
			} );
	}

} );
