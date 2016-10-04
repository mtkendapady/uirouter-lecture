angular.module( "Starship" )
.service( "starshipService", function( $http, $q ) {
	var baseUrl = "http://swapi.co/api/";
	var nextPageUrl = null;

	this.getCharacters = function() {
		return $http
					.get( baseUrl + "people" )
					.then( function( people ) {
						nextPageUrl = people.data.next;
						return people;
					} );
	}

	this.getStarships = function( urlArray ) {
		console.log( "top of getStarships in service" );
		var dfd = $q.defer();
		var starshipArray = [];

		for ( var i = 0; i < urlArray.length; i++ ) {
			$http.get( urlArray[ i ] ).then( function( starship ) {
				console.log( "inside .then in service" );
				starshipArray.push( starship.data );

				if ( starshipArray.length === urlArray.length ) {
					console.log( "inside of if in service" );
					dfd.resolve( starshipArray );
				}
			} );
		}
		return dfd.promise;
	}

	this.getNextPage = function() {
		return $http
				.get( nextPageUrl )
				.then( function( people ) {
					nextPageUrl = people.data.next;
					return people;
				} );
	}
} );
