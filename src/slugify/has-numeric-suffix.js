'use strict';

var _ = require( 'lodash' );

function hasNumericSuffix( slug ) {
	var words = slug.split( '-' );

	return !isNaN( +_.last( words ));
}

module.exports = hasNumericSuffix;
