(function( win,factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.service('siteAuthorizedService', [
	      	'$state','$timeout','$location','$rootScope','validatorFactory', 
	function( $state , $timeout , $location ,$rootScope , validatorFactory ) {
		var self = this;

		$rootScope.$authorized = false;

	 	self.logout = function() {
			win.io.socket.post('/login/logout', function ( resdata, jwres ) {
				switch( jwres.statusCode ) {
					case 400: case 403: case 404: case 500: 
					validatorFactory.addError( resdata );
				}
				if ( jwres.statusCode!==200 ) return;

				$rootScope.$authorized = false;
				$rootScope.$apply();
				$state.go( 'login' );
			});
		};

		self.authorized = function() {
			if ( $location.path()==='/logup' ) return;

			$timeout(function() {
				win.io.socket.post('/login/authorized', function ( authorized, jwres ) {
					switch( jwres.statusCode ) {
						case 400: case 403: case 404: case 500: 
						validatorFactory.addError( authorized );
					}
					if ( jwres.statusCode!==200 ) return;

					if ( authorized.authorized===true ) {
						$rootScope.$authorized = true;
						$rootScope.$apply();
						if ( $location.path().match( /\/site\/(.*)/ ) )
							$state.go( 'site.' + RegExp.$1 );
						else
							$state.go( 'site.home' );	
					}
					else {
						$rootScope.$authorized = false;
						$rootScope.$apply();
						$state.go( 'login' );
					}

				});
			}, 200);
		}
	}
])}));
