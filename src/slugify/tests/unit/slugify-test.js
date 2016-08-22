var chai = require( 'chai' );
var expect = chai.expect;

var slugify = require( '../..' );

describe( 'slugify', function() {
	it( 'should truncate the base of a slug to keep it\'s length within the limit when appending a numeric suffix', function() {
		expect( slugify( 'abcd', 4, [ 'ab', 'abcd' ])).to.equal( 'ab-1' );
	});

	it( 'should re-truncate a slug\'s base to accomodate an extra digit when incrementing a truncated slug\'s numeric suffix', function() {
		var slugs = [
			'abcd',
			'ab',
			'ab-1',
			'ab-2',
			'ab-3',
			'ab-4',
			'ab-5',
			'ab-6',
			'ab-7',
			'ab-8',
			'ab-9'
		];
		expect( slugify( 'abcd', 4, slugs )).to.equal( 'a-10' );
	});
});

