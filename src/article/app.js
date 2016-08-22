'use strict';

var express = require( 'express' ),
	ArticleRoutes = require( './routes' ),
	ImageRoutes = require( '../uploader/routes' ),
	bodyParser = require( 'body-parser' ),
	busboy  = require('connect-busboy');

module.exports = {
	init: function createArticleApp( articlesCollection, imageCollection, app ) {

		var ArticleMiddleWare = require( './middleware' )( articlesCollection, imageCollection );
		var ImageMiddleWare = require( '../uploader/middleware' )( imageCollection );

		app = app || express();

		app.use( bodyParser.urlencoded({ extended: false, type: 'application/x-www-form-urlencoded' }));
		app.use( bodyParser.json({type: 'application/json'}));
		app.use( busboy());

		app.post(
			'/article',
			ImageMiddleWare.validateImage,
			ArticleMiddleWare.validateArticle,
			ImageRoutes.uploads3(imageCollection),
			ArticleRoutes.create(articlesCollection),
			ImageMiddleWare.saveImageData
		);

		app.put(
			'/article',
			ImageMiddleWare.validateImage,
			ArticleMiddleWare.validateArticle,
			ImageRoutes.uploads3(imageCollection),
			ArticleRoutes.update(articlesCollection),
			ImageMiddleWare.saveImageData
		);

		app.get(
			'/articles',
			ArticleMiddleWare.loadAllArticles( articlesCollection, imageCollection ),
			function( req, res ) {
				res.json( res.locals.articles );
			}
		);

		app.get(
			'/:slug',
			ArticleMiddleWare.loadArticle( articlesCollection, imageCollection ),
			function( req, res ) {
				res.json( res.locals.article );
			}
		);

		return app;
	}
};
