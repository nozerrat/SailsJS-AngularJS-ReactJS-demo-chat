(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.controller('logupController', [
				'$state','$rootScope','validatorFactory', 
	function( $state , $rootScope , validatorFactory ) {
		var self = this;
		var validator = validatorFactory( 'logupForm' );
		
		this.resetData = function() {
			this.data = {
				username: '',
				password: '',
				repeat_password: '',
				discriminant: 'paciente'
			};
		};

		this.resetData();

		this.logup = function( data ) {
			if ( validator.runError() ) return;
			$rootScope.$loading = true;
			win.io.socket.post('/logup/subscribe', data, function( created,jwres ) {
				validator.cleanAll();
				if ( created.created===true )
					this.resetData();
				else
					validatorFactory.handlerError( jwres );
				$rootScope.$loading = false;
				$rootScope.$apply();
			}.bind( this ) );
		};
	}
]);}));
