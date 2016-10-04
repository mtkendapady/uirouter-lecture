angular.module( "Starship", [ 'ui.router' ] )
	.config( function( $stateProvider, $urlRouterProvider ) {

		$stateProvider
			.state( 'home', {
				url: '/',
				controller: 'homeCtrl',
				templateUrl: './src/home/home.html',
				resolve: {
					characters: function( $stateParams, starshipService ) {
						return starshipService.getCharacters()
					}
				}
			} )
			.state( 'character', {
				url: '/character/:characterId',
				controller: 'CharacterCtrl',
				templateUrl: './src/character/character.html',
				resolve: {
					character: function( $stateParams, starshipService ) {
						return starshipService.getCharacterData( $stateParams.characterId );
					}
				}
			} );

		$urlRouterProvider.otherwise( `/` );
	} )
