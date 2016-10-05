angular.module( "Starship" )
.controller( "characterCtrl", function( $scope, $stateParams, starshipService, character ) {

  $scope.character = character;

} )
