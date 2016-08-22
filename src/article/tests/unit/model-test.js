'use strict';

var	chai = require( 'chai' ),
	sinon = require( 'sinon' ),
	sinonChai = require( 'sinon-chai' ),
	expect = chai.expect,
	appConfig = require( '../../../kasra/app-config' ),
	Articles = require( '../../models/articles' );

chai.use( sinonChai );

describe( 'Articles', function() {
	it( 'should call find in order to get an array of articles', function() {

		var collectionMethods = {
			find: sinon.stub(),
			sort: sinon.stub(),
			toArray: sinon.stub()
		};

		collectionMethods.find.returns( collectionMethods );
		collectionMethods.sort.returns( collectionMethods );
		collectionMethods.toArray.returns( collectionMethods );

		var model = new Articles( collectionMethods );

		model.getAll();

		expect( collectionMethods.find ).to.have.been.calledOnce;
	});

	it( 'should insert article data in order to create an article', function() {

		var testArticle = {
			title: 'a title',
			body: 'Article body.'
		};

		var collectionMethods = {
			insert: function() { throw 'bad call'; }
		};

		sinon.stub( collectionMethods, 'insert' );

		var model = new Articles( collectionMethods ),
			done = sinon.spy();

		model.create( testArticle );

		expect( collectionMethods.insert ).to.have.been.calledWith( testArticle );
	});

	it( 'should timestamp new articles', function() {

		var testArticle = {
			title: 'a title',
			body: 'Article body.'
		};

		var collectionMethods = {
			insert: function() { throw 'bad call'; }
		};

		sinon.stub( collectionMethods, 'insert' );

		var model = new Articles( collectionMethods );

		model.create( testArticle );

		var args = collectionMethods.insert.args[0][0];
		expect( args ).to.have.property( 'publishDate' );
	});

	it( 'article timestamps should be in UTC time', function() {

		var testArticle = {
			title: 'a title',
			body: 'Article body.'
		};

		var collectionMethods = {
			insert: function() { throw 'bad call'; }
		};

		sinon.stub( collectionMethods, 'insert' );

		var model = new Articles( collectionMethods );

		model.create( testArticle );

		var insertedArticle = collectionMethods.insert.args[0][0];
		expect( insertedArticle.publishDate ).to.match( /Z$/ ); // ISO8601 timestamps in UTC time end with 'Z'
	});
});
