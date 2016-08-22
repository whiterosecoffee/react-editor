/*
 * slugify( string, maxLength, existingSlugs ) -> a unique, length-limited, url safe slug
 *
 * Note that there is a potential race condition where two duplicates of an existing slug are generated simultaneously in different processes, and saved to the same DB. There are several potential solutions:
 *	- Lock the database while generating slugs - this could really hurt the scalability of the site
 *	- Enforce uniqueness at the database level, so that the latter request fails on save. Delay and retry after a single failure
 *	- Do not use sequential suffixes to create unique slugs, use a random string or a hash of the document's contents, in which case you would not be using this module
 */

'use strict';

var uniqueify = require( './uniqueify' );
var sanitize = require( './sanitize' );
var hasNumericSuffix = require( './has-numeric-suffix' );
var restrictLength = require( './restrict-length' );

function slugify( slug, limit, slugs ) {

	var potentialSlug = uniqueify( sanitize( slug ), slugs );

	if( limit >= potentialSlug.length ) {
		return potentialSlug;
	}

	return slugify( restrictLength( potentialSlug, limit ), limit, slugs );
}

module.exports = slugify;
