(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;
var socket        = win.io.socket;

win.angular.module( 'app' )
.controller('reactController', [
	         '$scope','reactService',
	function( $scope , reactService ) {
		$scope.title = 'This me new title!!!';

		var PanelChat = createClass({
			getInitialState: function( ) {
				return {
					value: 'Type some *markdown* here!',
					textChat : [],
				};
			},
			componentWillMount: function() {
				socket.on('chat', function( received ) {
					this.state.textChat.push(
						dom.div({ className:"msg msg-received" },
							dom.div({ className:"text-chat" },
								received.text
							)//div
						)//div
					);
					this.setState({ textChat: this.state.textChat });
				}.bind( this ));
			},
			sendChat: function( e ) {
				e.preventDefault();
				socket.post('/chat/text', { text: this.refs.inputTextChat.value }, function( sent, jwres ) {	});
				this.state.textChat.push(
					dom.div({ className:"msg msg-sent" },
						dom.div({ className:"text-chat" },
							this.refs.inputTextChat.value
						)//div
					)//div
				);
				this.setState({ textChat: this.state.textChat });
				this.refs.inputTextChat.value = '';
			},
			render: function () {
				return (
					dom.div({ className:'col-md-6', style:{'margin':'auto','float':'none'} },
						dom.div({ className:'panel panel-primary' },
							dom.div({ className:'panel-heading' },
								dom.h3({ className:'panel-title'},
									'Chat'
								)//h3
							),//div
							dom.div({ className:'panel-body' },
								dom.div({ className:'container-msg' },
									this.state.textChat.map( function( elem, index ) {
										elem.key = index;
										return elem;
									})
								)//div
							),//div
							dom.div({ className:'panel-footer', style:{'padding':'0'} },
								dom.form({ className:'input-group', onSubmit:this.sendChat },
									dom.input({ ref:'inputTextChat', className:'form-control', placeholder:'Text...' }),//input
									dom.span({ className:'input-group-btn' },
										dom.button({ className:'btn btn-default' },
											dom.i({ className:'glyphicon glyphicon-arrow-right' })//i
										)//button
									)//span
								)//form
							)//div
						)//div
					)//div
				)//return
			}//render
		});
		
		render( createElement( PanelChat ), win.document.getElementById( 'chatReact' ) );

	}
])}));

