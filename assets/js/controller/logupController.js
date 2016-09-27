(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

var socket        = win.io.socket;
var getDataForm   = win.getDataForm;
var formName      = 'logupFormReact';

win.angular.module( 'app' ).controller('logupController', [
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
			socket.post('/logup/subscribe', getDataForm( formName ), function( created, jwres ) {
				validatorFactory.cleanAll( );
				if ( created.created===true )
					this.resetData();
				else
					validatorFactory.handlerError( jwres );
				$rootScope.$loading = false;
				$rootScope.$apply();
			});
		},
		goLogin: function() {
			$state.go( 'login' )
		},
		render: function() {
			var grids = {label_sm: 3,label_md: 3,label_lg: 3,field_sm: 6,field_md: 6,field_lg: 6};
			return (
				dom.form({className:"form-horizontal", name:formName, onSubmit: this.onSubmit},
					dom.div({ className:"form-group text-center"},
						dom.h2({className:"form-signin-heading"}, 
							'Usuarios Afiliados'
						)//h2
					),//div
					FormGroupComponent( Object.assign( {},grids,{label:'Email', name:'username', ariaRules:'email', placeholder:"pperez@gmail.com"} ) ),
					FormGroupComponent( Object.assign( {},grids,{label:'Password', name:'password', ariaRules:'', type:'password', placeholder:"Password"} ) ),
					FormGroupComponent( Object.assign( {},grids,{label:'Repetir Password', name:'repeat_password', ariaRules:'same:password', type:'password', placeholder:"Repetir Password"} ) ),
					dom.div({className:'form-group'},
						dom.label({className:'col-lg-3 col-md-3 col-sm-3 col-xs-12 control-label'},
							'Tipo de Persona'
						),//label
						dom.div({className:'col-lg-6 col-md-6 col-sm-6 col-xs-12'},
							dom.label({className:'radio-inline'},
								dom.input({defaultValue:'paciente', name:'discriminant', 'aria-rules':'required', 'aria-title':'Tipo de Persona', type:'radio', defaultChecked:true}),//input
								dom.span({},'Paciente')//span
							),//label
							dom.label({className:'radio-inline'},
								dom.input({defaultValue:'doctor', name:'discriminant', 'aria-rules':'required', 'aria-title':'Tipo de Persona', type:'radio'}),//input
								dom.span({},'Doctor')//span
							),//label
							dom.label({className:'radio-inline'},
								dom.input({defaultValue:'admin', name:'discriminant', 'aria-rules':'required', 'aria-title':'Tipo de Persona', type:'radio'}),//input
								dom.span({},'Admin')//span
							)//label
						)//div
					),//div
					dom.div({className:'form-group'},
						dom.div({className:'col-sm-offset-3 col-sm-6 text-right'},
							dom.a({'href':"javascript://", onClick:this.goLogin}, 
								'Regresar'
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
			)//return
		}//render
	})), win.document.getElementById( 'ContainerReact' ) );

}])}));
