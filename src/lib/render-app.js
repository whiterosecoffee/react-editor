var React = require( 'react' ),
	App = require( '../kasra/components/kasra' );

module.exports = function renderApp( context, done ) {
	var err = null;

	if( typeof context == 'undefined' ) {
		err = new Error( 'App has no context, unlike this error message' );
	}

	React.withContext( context, function() {
		done( err, '<!DOCTYPE html>\n' + React.renderToString( <App /> ));
	});
};
