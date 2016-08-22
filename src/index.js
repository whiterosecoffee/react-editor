'use strict';

// This file is only executed on the client.

var React = require( 'react' ),
	App = require( './kasra/components/kasra' );

if( typeof window.context === 'undefined' ) {
	console.error( 'App has no context, like this error message.' );
} else {
	React.withContext( window.context, function() {
		React.render( <App />, document );
	});
}
