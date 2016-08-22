'use strict';

var _ = require( 'lodash' );

var hasNumericSuffix = require( './has-numeric-suffix' );

// Limit the length of a slug by removing characters from the base, before any numeric identifier
function restrictLength( slug, limit ) {
	var excess = Math.max( 0, slug.length - limit );
	var words = slug.split( '-' );

	if( hasNumericSuffix( slug )) {
		var copy = +_.last( words );
		var base = words.slice( 0, -1 ).join( '-' );

		return ( base.slice( 0, base.length - excess ) + '-' + copy );
	} else {
		return slug.slice( 0, slug.length - excess );
	}
}

module.exports = restrictLength;
