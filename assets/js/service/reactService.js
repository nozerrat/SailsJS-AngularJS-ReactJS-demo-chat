(function( win, factory ){ factory( win ); }( this, function( win ) {
var DOM           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

win.angular.module( 'app' )
.service('reactService', [
	function( ) {
		this.GreetingSection = createClass({displayName: 'Greeting',
			render: function() {
				var message1 = "Service: " + this.props.name + "";
				return (
					DOM.div( {},
						DOM.div( {}, message1 )//div
					)//div
				)//return
			}//render
		});
	}
])}));
