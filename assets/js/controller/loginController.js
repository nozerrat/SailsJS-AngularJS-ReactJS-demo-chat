(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.controller('loginController', [
	         '$state','validatorFactory','$rootScope', 
	function( $state , validatorFactory , $rootScope ) {
		
		var validator = validatorFactory( 'loginForm' );
		
		this.data = {
			username:'dfigueroa@corredor.com',
			password:'123',
		};

	 	this.login = function( data ) {
	 		if ( validatorFactory.runError( ) ) return;
	 		$rootScope.$loading = true;

			win.io.socket.post('/login/authorize', data, function( authorized, jwres ) {
				validatorFactory.cleanAll( );
				if ( authorized===true ) {
					$rootScope.$authorized = true;
					$state.go( 'site.home' );
				}
				else validatorFactory.handlerError( jwres );
				$rootScope.$loading = false;
				$rootScope.$apply();
			});
	 	}
	}
])}));

