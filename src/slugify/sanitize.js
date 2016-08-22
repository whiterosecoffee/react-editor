// Replace significant characters in urls with dashes. Remove duplicate dashes and trailing dashes.
function sanitize( slug ) {
	return slug.replace( /[\/\s\?=&]+/g, '-' ).replace( /--+/g, '-' ).replace( /^-|-$/g, '' );
}

module.exports = sanitize;
