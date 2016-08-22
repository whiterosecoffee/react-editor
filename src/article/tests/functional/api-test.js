var request = require( 'supertest' ),
	express = require( 'express' ),
	util = require( 'util' ),
	articleApp = require( '../../app' ),
	ArticleModel = require( '../../models/articles.js' ),
	bodyParser = require( 'body-parser' ),
	mongodb = require( '../../../lib/mongo-connect' )();

var LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet ipsum elit. Vestibulum lobortis dignissim purus quis tempor. Mauris luctus lorem eu tortor dictum ullamcorper. Etiam viverra interdum magna, at dapibus ante lobortis feugiat. Sed egestas id nulla a dapibus. Curabitur porta ligula non lacus ullamcorper, non bibendum quam sagittis. Praesent suscipit dolor a nibh fermentum feugiat. Nulla pellentesque nec nunc a volutpat. Nullam ante eros, elementum sed dui id, pretium iaculis sem. Pellentesque sed odio enim. Nam vel nulla finibus, pretium dolor vel, rutrum justo. Cras eu convallis urna.';

describe( 'Articles API', function() {
	var app,model,connection;

	before( function( done ) {
		mongodb.connect(function(err,mongoHandler) {
			var collection;

			if(err) {
				return done( err );
			}

			connection = mongoHandler.connection;
			collection = connection.collection( 'articles' );

			// FIXME: articleApp should set up it's own collection connection
			app = express();
			app.use( bodyParser.urlencoded({ extended: false, type: 'application/x-www-form-urlencoded' }));
			app.use( bodyParser.json({type: 'application/json'}));

			app = articleApp.init( collection, app);
			model = new ArticleModel( collection );

			done();
		});
	});

	describe( 'GET /articles', function() {
		// it( 'should return a JSON array', function( done ) {
		// 	request( app )
		// 	.get( '/articles' )
		// 	.set('Accept', 'application/json')
		// 	.expect( 200 )
		// 	.expect( 'Content-Type', /json/ )
		// 	.expect( function( res ) {
		// 		if( !Array.isArray( res.body )) {
		// 			return 'expected an array, got ' + util.inspect( res.body );
		// 		}
		// 	})
		// 	.end( done );
		// });

		// TODO: test with an expendable data set so that we can inspect an article.
	});

	describe( 'POST /article', function() {
		it( 'should return a 400 Bad Request error if the title is empty', function( done ) {
			var article = {
				title: '',
				body: LIPSUM
			};

			request( app )
			.post( '/article' )
			.send(article)
			.set('Accept', 'application/json')
			.expect( 400 )
			.end( done );
		});

		it( 'should return a 400 Bad Request error if the body is empty', function( done ) {
			var article = {
				title: 'A title',
				body: ''
			};

			request( app )
			.post( '/article' )
			.send(article)
			.set('Accept', 'application/json')
			.expect( 400 )
			.end( done );
		});


		it( 'A bad JSON request should return a JSON response', function( done ) {
			var article = {
				title: '',
				body: LIPSUM
			};

			request( app )
			.post( '/article' )
			.send(article)
			.set('Accept', 'application/json')
			.expect( 'Content-Type', /json/ )
			.end( done );
		});

		it( 'Should return an article id if aricle is saved', function( done ) {
			var article = {
				title: 'sdsdsds',
				body: 'A body long long sdsds sfa f s sdsdkjsdjsdksdjks akfjafakdfjdfkdkjdfj dsfsdksfj dsfsdkfjdsf'
			};

			request( app )
			.post( '/article/' )
			.send(article)
			.set('Accept', 'application/json')
			.expect( 'Content-Type', /json/ )
			.expect( function( res ) {
				if( !res.body._id) {
					return 'expected an article id, got ' + util.inspect( res.body );
				} 

			})
			.end(function(err,res) {
				if(err) {
					done(err);
				} else {
					model.removeById(res.body._id,function(err){
						done(err);
					});
				}
			});
		});


		it( 'Should return an article which has a slug field', function( done ) {
			var article = {
				title: '',
				body: 'A body long long sdsds sfa f s sdsdkjsdjsdksdjks akfjafakdfjdfkdkjdfj dsfsdksfj dsfsdkfjdsf'
			};

			request( app )
			.post( '/article/' )
			.send(article)
			.set('X-TestNoValidate', '21cd051af3a78cc4f56a83677c8bffbe')
			.set('Accept', 'application/json')
			.expect( 'Content-Type', /json/ )
			.expect( function( res ) {
				if( !res.body.slug && res.body.slug !== '') {
					return 'expected an article slug field, got ' + util.inspect( res.body );
				} 

			})
			.end(function(err,res) {
				if(err) {
					done(err);
				} else {
					model.removeById(res.body._id,function(err){
						done(err);
					});
				}
			});
		});

	});


	after( function( done ) {
		connection.close();
		done();
	});
});
