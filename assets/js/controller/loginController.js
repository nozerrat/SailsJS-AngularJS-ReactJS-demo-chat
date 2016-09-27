(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

var socket        = win.io.socket;
var getDataForm   = win.getDataForm;
var formName = 'loginFormReact';

win.angular.module( 'app' ).controller('loginController', [
			'$state','$rootScope','validatorFactory','FormGroupComponent', 
function( $state , $rootScope , validatorFactory , FormGroupComponent ) {
		
	render( createElement( createClass({
		componentDidMount: function() {
			validatorFactory( formName );
		},
		onSubmit: function( e ) {
			e.preventDefault();
			if ( validatorFactory.runError( ) ) return;
			$rootScope.$loading = true;
			$rootScope.$apply();
			socket.post('/login/authorize', getDataForm( formName ), function( authorized, jwres ) {
				validatorFactory.cleanAll( );
				if ( authorized===true ) 
					$state.go( 'site.home' );
				else 
					validatorFactory.handlerError( jwres );
				$rootScope.$loading = false;
				$rootScope.$apply();
			});
		},
		goLogup: function() {
			$state.go( 'logup' );
		},
		render: function(argument) {
			var grids = {label_sm: 3,label_md: 3,label_lg: 3,field_sm: 6,field_md: 6,field_lg: 6};
			return (
				$rootScope.$authorized
				?dom.div({})//div
				:dom.form({className:"form-horizontal", name:formName, onSubmit: this.onSubmit},
					dom.div({ className:"form-group text-center"},
						dom.h2({className:"form-signin-heading"}, 
							'Usuarios Afiliados'
						)//h2
					),//div
					FormGroupComponent( Object.assign( {},grids,{label:'Email', name:'username', ariaRules:'email', placeholder:"pperez@gmail.com"} ) ),
					FormGroupComponent( Object.assign( {},grids,{label:'Password', name:'password', ariaRules:'', type:'password', placeholder:"Password"} ) ),
					dom.div({className:'form-group'},
						dom.div({className:'col-sm-offset-3 col-sm-6 text-right'},
							dom.a({'href':"javascript://", onClick:this.goLogup}, 
								'Afiliarse'
							)//a
						)//div
					),//div
					dom.div({className:"form-group"},
						dom.div({className:'col-sm-offset-3 col-sm-6 text-right'},
							dom.button({className:'btn btn-lg btn-primary btn-block'},
								'Aceptar'
							)//botton
						)//div
					)//div
				)//form
			);
		}
	})), win.document.getElementById( 'ContainerReact' ) );

}])}));
