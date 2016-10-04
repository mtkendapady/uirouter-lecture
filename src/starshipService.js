angular.module( "Starship" )
	.service( "starshipService", function( $http, $q ) {
		var baseUrl = "http://swapi.co/api/";
		var nextPageUrl = null;

		this.getCharacters = function() {
			return $http
				.get( baseUrl + "people" )
				.then( function( people ) {
					nextPageUrl = people.data.next;
					for ( var i = 0; i < people.data.results.length; i++ ) {
						var char = people.data.results[ i ];
						var split = char.url.split( '/' );
						var characterId = split[ split.length - 2 ];
						char.id = characterId;
					}
					return people.data.results;
				} );
		}

    //Above function with $q
		// this.getCharacters = function() {
		// 	var dfd = $q.defer();
		//   $http.get( baseUrl + "people" ).then( function( people ) {
		//       nextPageUrl = people.data.next;
		//       //
		//       for( var i = 0; i < people.data.results.length; i++ ) {
		//         var char = people.data.results[ i ];
		//         var split = char.url.split( '/' );
		//         var characterId = split[ split.length-2 ];
		//         char.id = characterId;
		//       }
		// 				dfd.resolve( people.data.results );
		// 			} );
		// 	return dfd.promise;
		// }

		this.getCharacterData = function( characterId ) {
			console.log( characterId )
			var deferred = $q.defer();
			//get character data
			var characterComplete;
			$http( {
				method: 'GET',
				url: baseUrl + "people/" + characterId
			} ).then( function( result ) {
				characterComplete = result.data;
				return $http( {
					method: 'GET',
					url: characterComplete.homeworld
				} );
			} ).then( function( result ) {
				characterComplete.homeworld = result.data;
				deferred.resolve( characterComplete );
			} );
			return deferred.promise;
		};

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
					for ( var i = 0; i < people.data.results.length; i++ ) {
						var char = people.data.results[ i ];
						var split = char.url.split( '/' );
						var characterId = split[ split.length - 2 ];
						char.id = characterId;
					}
					return people.data.results;
				} );
		}
	} );
