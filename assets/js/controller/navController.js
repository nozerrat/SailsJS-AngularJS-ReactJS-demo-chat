(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' )
.controller('navController', [
	         '$scope',
	function( $scope ) {
		this.collapse = 'collapse';

		win.jQuery( 'nav.navbar' ).mouseleave(function() {
			this.collapse = 'collapse';
			$scope.$apply();
		}.bind(this));
		
		win.jQuery( 'button.navbar-toggle' ).mouseenter(function() {
			this.collapse = '';
			$scope.$apply();
		}.bind(this));
		
		win.jQuery( '[ui-sref]' ).click(function() {
			this.collapse = 'collapse';
			$scope.$apply();
		}.bind(this));

	}
])}));

