(function( win,factory ){ factory( win ); }( this, function( win ) {
var socket = win.io.socket;
win.angular.module( 'app' ).service('siteAuthorizedService', [
			'$state','$timeout','$location','$rootScope','validatorFactory', 
function( $state , $timeout , $location , $rootScope , validatorFactory ) {
	var self = this;

	$rootScope.$authorized = false;

 	self.logout = function() {
		$rootScope.$loading = true;
		socket.post('/login/logout', function ( resdata, jwres ) {
			switch( jwres.statusCode ) {
				case 400: case 403: case 404: case 500: 
				validatorFactory.addError( resdata );
			}
			if ( jwres.statusCode!==200 ) return;

			$state.go( 'login' );
			$rootScope.$loading = false;
			$rootScope.$authorized = false;
			$rootScope.$apply();
		});
	};

	self.authorized = function() {
		if ( $location.path()==='/logup' ) return;
		$rootScope.$loading = true;

		$timeout(function() {
			socket.post('/login/authorized', function ( authorized, jwres ) {
				switch( jwres.statusCode ) {
					case 400: case 403: case 404: case 500: 
					validatorFactory.addError( authorized );
				}
				if ( jwres.statusCode!==200 ) return;

				if ( authorized.authorized===true ) {
					$rootScope.$authorized = true;
					if ( $location.path().match( /\/site\/(.*)/ ) )
						$state.go( 'site.' + RegExp.$1 );
					else
						$state.go( 'site.home' );	
				}
				else {
					$rootScope.$authorized = false;
					$state.go( 'login' );
				}
				
				$rootScope.$loading = false;
				$rootScope.$apply();
			});
		}, 200);
	}
}])}));
