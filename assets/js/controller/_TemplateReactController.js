(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

win.angular.module( 'app' ).controller('loginController', [
function( ) {
	
	render( createElement( createClass({
		render: function() {
			return (
				dom.div({})//div
			)//return
		}//render
	})), win.document.getElementById( 'ContainerReact' ) );

}])}));
