(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;

win.angular.module( 'app' ).factory('reactService', [
function( ) {
	
	return function( properties ) { return createElement( createClass({
		render: function() {
			return (
				dom.div({})//div
			)//return
		}//render
	}), properties || {} )}

}])}));
