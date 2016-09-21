(function( win, factory ){ factory( win ); }( this, function( win ) {
var DOM           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

win.angular.module( 'app' )
.controller('react2Controller', [
	         '$scope','reactService',
	function( $scope , reactService ) {
		$scope.title = 'This me new title!!!';

		var Hello = createClass({
			getInitialState: function( ) {
				return {value: 'Type some *markdown* here!'};
			},
			handleChange: function() {
				this.setState({
					value: this.refs.input.value
				});
			},
			render: function () {
				return (
					DOM.div( {}, 'Hello, haters!!!!!',
						DOM.input({
							ref:"input",
							value:this.state.value,
							onChange:this.handleChange,
						}),//input
						DOM.hr(),//hr
						DOM.span({}, this.state.value ),//span
						DOM.hr(),//hr
						createElement( reactService.GreetingSection, {name: this.state.value })//greeting
					)//div
				)//return
			}//render
		});
		
		render( createElement( Hello ), win.document.getElementById( 'chatReact' ) );

	}
])}));

