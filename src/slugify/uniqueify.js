var _ = require( 'lodash' );

var hasNumericSuffix = require( './has-numeric-suffix' );

// Make a slug unique by incrementing or appending a number
function uniqueify( slug, slugs ) {

	if( !slugs.length ) {
		return slug;
	}

	if( !_.contains( slugs, slug )) {
		return slug;
	}

	var words = slug.split( '-' );

	if( !hasNumericSuffix( slug )) {
		return uniqueify( words.join( '-' ) + '-1', slugs );
	}

	var count = +words.pop() + 1;
	var potentiallyUniqueSlug = words.join( '-' ) + '-' + count;

	return uniqueify( potentiallyUniqueSlug, slugs );
}

module.exports = uniqueify;
