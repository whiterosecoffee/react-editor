var chai = require( 'chai' );
var expect = chai.expect;

var hasNumericSuffix = require( '../../has-numeric-suffix' );

describe( 'hasNumericSuffix', function() {
	it( 'should identify strings having a numeric suffix', function() {
		expect( hasNumericSuffix( 'abc-123' )).to.be.true;
	});

	it( 'should not falsely identify strings that do not have a numeric suffix', function() {
		expect( hasNumericSuffix( 'ab-cd' )).to.be.false;
	});
});
