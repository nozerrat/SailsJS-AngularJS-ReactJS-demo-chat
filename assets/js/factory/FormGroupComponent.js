(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;

var document     = win.document;
var $            = win.jQuery;

var Panel        = win.ReactBootstrap.Panel;
var FormGroup    = win.ReactBootstrap.FormGroup;
var InputGroup   = win.ReactBootstrap.InputGroup;
var FormControl  = win.ReactBootstrap.FormControl;
var Glyphicon    = win.ReactBootstrap.Glyphicon;
var Button       = win.ReactBootstrap.Button;
var HelpBlock    = win.ReactBootstrap.HelpBlock;

var Checkbox     = win.ReactBootstrap.Checkbox;
var Radio        = win.ReactBootstrap.Radio;
var ControlLabel = win.ReactBootstrap.ControlLabel;
var Col          = win.ReactBootstrap.Col;

win.angular.module( 'app' ).factory('FormGroupComponent', [
function(  ) {
	return function( properties ) { return createElement( createClass({
		getDefaultProps: function() {
			 return {
			 		label_xs: 12,
					label_sm: 4,
					label_md: 4,
					label_lg: 4,
					field_xs: 12,
					field_sm: 7,
					field_md: 7,
					field_lg: 7,
					id: '',
					name: '',
					type: 'text',
					label: 'Label',
					ariaRules:'',
					multiple: false,
					required: true,
					placeholder: '',
					onChange: function(){},
			 };
		},
		getInitialState: function() {
			 return {
					id: '',
					name: '',
					type: 'text',
					label: 'Label',
					ariaRules:'',
					multiple: false,
					required: true,
					placeholder: '',
					onChange: function(){},
			 };
		},
		propsUpdate: function( props ) {
			if ( props.required ) {
				if ( props.ariaRules )
				  props.ariaRules = 'required|' + props.ariaRules;
				else
				  props.ariaRules = 'required';
			}
			this.setState( props );
		},
		componentWillMount: function() {
			this.propsUpdate( this.props );
		},
		componentWillReceiveProps: function( nextProps ) {
			this.propsUpdate( nextProps );
		},
		componentDidMount: function() {
			$(document).ready(function() {
				$('.datepicker').datepicker({
					prevText: 'Atras',
					nextText: 'Siguiente',
					currentText: 'Hoy',
					monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
					monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
					dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
					dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sab'],
					dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
					weekHeader: 'Sm',
					dateFormat: 'dd/mm/yy',
					inline:true,
					changeMonth: true,
					changeYear: true,
					showOn: "both",
					buttonText: '<i class="btn glyphicon glyphicon-th"></i>',
					onSelect: function () {
						this.focus();
					}
					//minDate: -20, 
					//maxDate: "+1M"
				});
			});
		},
		render: function() {
			switch( this.state.type ) {
				case 'password':
				case 'number':
				case 'email':
				case 'file':
				case 'text': 
					var InputFormGroup = (
						createElement(FormControl, {
							id:  this.state.id, 
							name:  this.state.name, 
							type:  this.state.type, 
							onChange:  this.state.onChange, 
							"aria-rules":  this.state.ariaRules, 
							"aria-title":  this.state.label, 
							placeholder:  this.state.placeholder}
						)
					); break;
				case 'radio':
				case 'checkbox':
					var InputFormGroup = (
						dom.div({}, 
							this.state.children
						)
					); break;
				case 'select':
					var InputFormGroup = (
						createElement(FormControl, {componentClass: "select", 
							id:  this.state.id, 
							name:  this.state.name, 
							type:  this.state.type, 
							onChange:  this.state.onChange, 
							multiple:  this.state.multiple, 
							placeholder:  this.state.placeholder, 
							"aria-rules":  this.state.ariaRules, 
							"aria-title":  this.state.label
						}, 
							this.state.children
						)
					); break;
				case 'textarea': 
					var InputFormGroup = (
						createElement(FormControl, {componentClass: "textarea", 
							id:  this.state.id, 
							name:  this.state.name, 
							type:  this.state.type, 
							onChange:  this.state.onChange, 
							placeholder:  this.state.placeholder, 
							"aria-rules":  this.state.ariaRules, 
							"aria-title":  this.state.label}
						)
					); break;
				case 'other':
					var InputFormGroup = (
						dom.div({}, 
							this.state.children
						)
					); break;
				case 'date':
					var InputFormGroup = (
						createElement(InputGroup, {style: {display: 'block'}}, 
							dom.input({type: "text", className: "form-control datepicker", 
								name:  this.state.name, 
								onChange:  this.state.onChange, 
								placeholder:  this.state.placeholder, 
								"aria-rules":  this.state.ariaRules, 
								"aria-title":  this.state.label, 
								style:  { width:'87%'} }
							)
						)
				); break;
				default : var InputFormGroup = null;
			}
			if ( InputFormGroup ) {
				return (
					createElement(FormGroup, {}, 
						createElement(Col, {xs:  this.state.label_xs, sm:  this.state.label_sm, md:  this.state.label_md, lg:  this.state.label_lg, componentClass: ControlLabel}, 
							this.state.label+' ', dom.span({className: this.state.required?'required':'optional'}, "(*)")
						), 
						createElement(Col, {xs:  this.state.field_xs, sm:  this.state.field_sm, md:  this.state.field_md, lg:  this.state.field_lg}, 
							 InputFormGroup, 
							createElement(HelpBlock, {})
						)
					)
				);
			} else {
				return dom.div({}, "");
			}
		}
	}), properties || {} )}
}])}));
