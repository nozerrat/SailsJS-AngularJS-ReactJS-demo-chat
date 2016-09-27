(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app' ).controller('chatController', [
			'$state','$rootScope',
function( $state , $rootScope ) {
	this.text='';
	var containerMsg = win.jQuery( '.container-msg' );		
	// if ( $rootScope.subscribedToFunRoom!==true ) {
		win.io.socket.on('chatClient', function( received, jwres ) {
			$rootScope.subscribedToFunRoom = true;
			$rootScope.$apply();
			var chat = win.jQuery( '<div class="msg msg-received"/>' );
			var textChat = win.jQuery( '<div class="text-chat"/>' );
			chat.append( textChat.html( received.text ) );
			containerMsg.append( chat );
		});
	// }

	this.submit = function() {
		$rootScope.$loading = true;
		var chat = win.jQuery( '<div class="msg msg-sent"/>' );
		var textChat = win.jQuery( '<div class="text-chat"/>' );
		chat.append( textChat.html( this.text ) );
		containerMsg.append( chat );
		win.io.socket.post('/chat/text', { text: this.text }, function( sent, jwres ) {
			$rootScope.$loading = false;
			$rootScope.$apply();
		});
		this.text = '';
	};
}]);}));
