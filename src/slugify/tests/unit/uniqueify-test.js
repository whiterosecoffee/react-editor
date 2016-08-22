var uniqueify = require( '../../uniqueify' );
var chai = require( 'chai' );
var expect = chai.expect;

describe( 'uniqueify', function() {
	it( 'should return a unique slug unmodified', function() {
		expect( uniqueify( 'a', [] )).to.equal( 'a' );
		expect( uniqueify( 'a', [ 'b' ])).to.equal( 'a' );
		expect( uniqueify( 'a', [ 'b', 'c' ])).to.equal( 'a' );
	});

	it( 'should append "-1" to a non numbered duplicate slug', function() {
		expect( uniqueify( 'a', [ 'a' ])).to.equal( 'a-1' );
	});

	it( 'should increment a slug\'s numeric suffix', function() {
		expect( uniqueify( 'a-1', [ 'a-1' ])).to.equal( 'a-2' );
	});

	it( 'should append "-n" to a duplicate slug, where "n" is a unique number', function() {
		expect( uniqueify( 'a', [ 'a', 'a-1', 'a-2' ])).to.equal( 'a-3' );
	});
});
