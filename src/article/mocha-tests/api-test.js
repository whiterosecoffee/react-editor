'use strict';

var path = require( 'path' ),
	_ = require( 'lodash' ),
	request = require( 'supertest' ),
	express = require( 'express' ),
	appConfig = require( path.join( '../../kasra/app-config' )),
	articleData = require( './fixtures/articles' );

var app = express();

var testData = { name: 'dan' };

app.get('/user', function( req, res ) {
	res.send( testData );
});

describe( 'GET /users', function() {
	it( 'responds with the expected data', function( done ) {
		request(app)
			.get( '/user' )
			.expect( 'Content-Type', /json/ )
			.expect( function( res ) {
				if( !_.isEqual( testData, res.body )) {
					return 'Test data is not equal to response data.\n' +
						JSON.stringify( testData ) + '\n' +
						JSON.stringify( res.body );
				}
			})
			.expect( 200, done );
	});
});
