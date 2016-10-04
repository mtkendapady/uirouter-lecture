angular.module( "Starship" )
	.controller( "CharacterCtrl", function( $scope, $stateParams, starshipService, character ) {

		$scope.character = character;
		$scope.starships = [];

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
	} );
