(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;

win.angular.module( 'app' ).factory('LoadingComponent', [
function( ) {
	return function( loading ) { return createElement( createClass({
		render: function() {
			return (
				!this.props.loading
				?dom.div()
				:dom.div({style: {"overflow":"hidden","width":"100%","height":"100%","z-index":"10000","position":"fixed","top":"0","left":"0"}}, 
					dom.div({style: {"overflow":"hidden","width":"100%","height":"100%","z-index":"9000","position":"fixed","top":"0","left":"0","background-color":"black","opacity":"0.1"}}), 
					dom.div({style: {"z-index":"1100","text-align":"center","font-size":"75px","color":"#737272","top":"50px","margin-top":" 120px"}}, 
						dom.h1({}, "Loading..."), 
						dom.i({className: "fa fa-spinner fa-pulse"})
					)
				)
			)//return
		}//render
	}), {loading: loading} )}
}])}));
