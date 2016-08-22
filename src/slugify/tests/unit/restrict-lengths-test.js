var chai = require( 'chai' );
var expect = chai.expect;

var restrictLength = require( '../../restrict-length' );

describe( 'restrictLength', function() {
	it( 'should truncate a string', function() {
		expect( restrictLength( 'abcd', 2 )).to.equal( 'ab' );
	});

	it( 'should truncate the base of a numbered string', function() {
		expect( restrictLength( 'abcd-1', 4 )).to.equal( 'ab-1' );
	});
});
