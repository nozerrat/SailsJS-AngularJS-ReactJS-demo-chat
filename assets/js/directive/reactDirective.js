(function( win, factory ){ factory( win ); }( this, function( win ) {
var DOM           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

/*

<greeting name="Joe"></greeting>

*/

win.angular.module( 'app' )
.directive('greeting', [
	function(  ) {
		return {
			restrict:'AE',
			scope:{
				name:'@'
			},
			link: function (scope, elem, attrs) {

				var GreetingSection = createClass({displayName: 'Greeting',
					render: function() {
						var message1 = "Props: " + this.props.data.name + "";
						var message2 = "Scope: " + scope.name + "";
						return (
							DOM.div( {},
								DOM.div( {}, message1 ),//div
								DOM.div( {}, message2 )//div
							)//div
						)//return
					}//render
				});

				render(createElement(GreetingSection,{data:scope}), elem[0]);

			}
		};
	}
])}));

