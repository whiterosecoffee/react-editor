var sanitize = require( '../../sanitize' );
var chai = require( 'chai' );
var expect = chai.expect;

describe( 'sanitize', function() {
	it( 'should convert chars that are significant in a url to dashes', function() {
		expect( sanitize( 'google.com/images?q=123&utma=321' )).to.equal( 'google.com-images-q-123-utma-321' );
	});

	it( 'should not create double dashes', function() {
		expect( sanitize( 'a.com/?n=-1&d=--' )).to.equal( 'a.com-n-1-d' );
	});
});
