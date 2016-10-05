angular.module( "Starship", ["ui.router"] )
.config( function( $stateProvider, $urlRouterProvider ) {

  $stateProvider.state( "home", {
    url: "/",
    templateUrl: "./src/home/home.html",
    controller: "homeCtrl",
    resolve: {
      characters: function( starshipService ) {
        return starshipService.getCharacters();
      }
    }
  })

  $stateProvider.state( "character", {
    url: "/character/:characterId",
    // the colon above sort of activates the stateparams.
    templateUrl: "./src/character/character.html",
    controller: "characterCtrl",
    resolve: {
      character: function( $stateParams, starshipService ) {
        return starshipService.getCharacterData( $stateParams.characterId );
      }
    }
  })

});
