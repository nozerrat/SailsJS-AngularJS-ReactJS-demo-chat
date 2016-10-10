(function( win, factory ){ factory( win ); }( this, function( win ) {
var dom           = win.React.DOM;
var createClass   = win.React.createClass;
var createElement = win.React.createElement;
var render        = win.ReactDOM.render;

var Navbar        = win.ReactBootstrap.Navbar;
var Header        = win.ReactBootstrap.Navbar.Header;
var Brand         = win.ReactBootstrap.Navbar.Brand;
var Toggle        = win.ReactBootstrap.Navbar.Toggle;
var Collapse      = win.ReactBootstrap.Navbar.Collapse;
var Nav           = win.ReactBootstrap.Nav;
var NavItem       = win.ReactBootstrap.NavItem;
var NavDropdown   = win.ReactBootstrap.NavDropdown;
var MenuItem      = win.ReactBootstrap.MenuItem;

win.angular.module( 'app' ).controller('navController', [
			'$state','siteAuthorizedService',
function( $state , siteAuthorizedService ) {
	render( createElement( createClass({
		getInitialState: function() {
			return {collapse:true};
		},
		collapseEnter: function( ) {
			this.setState({ collapse:false });
		},
		linkHandle: function( state ) {
			if ( _.isString( state ) )
				$state.go( 'site.' + state );
			this.setState({ collapse:true});
		},
		render: function() {
			return (
				createElement(Navbar,{inverse:true,fixedTop:true,expanded:!this.state.collapse},
					createElement(Header,{},
						createElement(Brand,{},
							dom.a({href:"#"},'React-Bootstrap')//a
						),//Brand
						createElement(Toggle,{onMouseEnter:this.collapseEnter})//Toggle
					),//Header
					createElement(Collapse,{onMouseLeave:this.linkHandle},
						createElement(Nav,{},
							createElement(NavItem,{onClick:this.linkHandle.bind(this,'home'),href:"#"},'Home'),//NavItem
							createElement(NavDropdown,{title:"Dropdown",href:"#"},
								createElement(MenuItem,{onClick:this.linkHandle.bind(this,'chat'),href:"#"},'Chat'),//MenuItem
								createElement(MenuItem,{divider:true}),//MenuItem
								createElement(MenuItem,{onClick:this.linkHandle.bind(this,'react'),href:"#"},'Chat React')//MenuItem
							)//NavDropdown
						),//Nav
						createElement(Nav,{pullRight:true},
							createElement(NavItem,{onClick:siteAuthorizedService.logout,href:"#"}, 'Logout')//NavItem
						)//Nav
					)//Collapse
				)//Navbar
			)//return
		}//render
	})), win.document.getElementById( 'ContainerNavbarReact' ) );

}])}));
