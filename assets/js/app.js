(function( win, factory ){ factory( win ); }( this, function( win ) {
win.angular.module( 'app', [
	'ui.router',
])
.run([      '$rootScope','$state','$stateParams','siteAuthorizedService',
	function( $rootScope , $state , $stateParams , siteAuthorizedService ) {
		// Es muy práctico para añadir referencias al $state y $stateParams a los $rootScope 
		// para que pueda acceder a ellos desde cualquier ámbito en el ejemplo applications.
		// Por ejemplo, <li ng-class="{ active: $state.includes('contacts.list') }"> se defina <li> 
		// para siempre activa 'contacts.list 'o uno de sus decendientes se encuentra activo.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		$rootScope.$logout = siteAuthorizedService.logout;
		siteAuthorizedService.authorized();
	}
])
.config([   '$stateProvider','$urlRouterProvider','$locationProvider',
	function( $stateProvider , $urlRouterProvider , $locationProvider ) {
		var uri = 'assets/templates/';

		$locationProvider.hashPrefix( '!' );
		$locationProvider.html5Mode( true );
		$urlRouterProvider.otherwise( '/' );

		$stateProvider
		.state( 'login', {
			url: '/',
			template: win.JST[uri+'login/login.html'],
			controller: 'loginController as Ctrl',
		})
		.state( 'logup', {
			url: '/logup',
			template: win.JST[uri+'logup/logup.html'],
			controller: 'logupController as Ctrl',
		})

		.state( 'site', {
			// Con conjunto abstracto de verdad, eso significa que este estado no se puede activar de forma explícita.
			// Sólo puede ser implícitamente activa mediante la activación de uno de sus hijos.
			abstract: true,
			url: '/site',
			template: win.JST[uri+'site.html'],
			onEnter: [   'siteAuthorizedService',
				function ( siteAuthorizedService ) {
					siteAuthorizedService.authorized( );
		  		}
		  	],
		})

		.state( 'site.home', {
			url: '/home',
			views: {
				site: {
					template: win.JST[uri+'homepage.html'],
				},
			}
		})
		.state( 'site.chat', {
			url: '/chat',
			views: {
				site: {
					template: win.JST[uri+'chat/chat.html'],
					controller: 'chatController as Ctrl',
				}
			}
		})
		.state( 'site.react', {
			url: '/react',
			views: {
				site: {
					template: win.JST[uri+'react/react.html'],
					controller: 'reactController as Ctrl',
				}
			}
		})

	}
]);
}));
