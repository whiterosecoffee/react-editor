'use strict';

require( 'node-jsx' ).install();

var express = require( 'express' ),
	logger = require( 'morgan' ),
	favicon = require( 'serve-favicon' ),
	errorHandler = require( 'errorhandler' ),
	customErrorHandlers = require( '../lib/error-handlers'),
	path = require( 'path' ),
	article = require( '../article' ),
	uploader = require( '../uploader' ),
	prepareCleanup = require( '../lib/cleanup' ),
	renderApp = require( '../lib/render-app' ),
	kasraLabels = require( './labels' ),
	homePageLabels = require( '../home-page/labels' ),
	editorLabels = require( '../article-editor/labels' );

var metaData = [
	{
		name: 'description',
		value: kasraLabels.description
	},
	{
		name: 'twitter:card',
		content: 'summary_large_image'
	},
	{
		name: 'twitter:title',
		content: homePageLabels.title
	},
	{
		name: 'twitter:site',
		content: '@kasraonline'
	},
	{
		name: 'twitter:image:src',
		content: kasraLabels.imageUrl
	},
	{
		property: 'og:image',
		content: kasraLabels.imageUrl
	},
	{
		property: 'og:site_name',
		content: homePageLabels.title
	},
	{
		property: 'og:site_url',
		content: "http://kasra.co"
	},
	{
		property: 'fb:admins',
		content: '751451768228843'
	},
];

module.exports = {

	// db should be a MongoDB connection
	create: function createKasraApp( db, staticPath ) {

		var app = express(),
			ArticleMiddleware = require( '../article/middleware' )(
				db.connection.collection( 'articles' ),
				db.connection.collection( 'images' )
			);

		app.set( 'db', db );

		app.use( favicon( path.join( staticPath, 'images/favicon.ico' )));
		app.use( logger( 'dev' ));

		app.get(
			'/',
			ArticleMiddleware.loadAllArticles(),
			function( req, res ) {

				var context = {
					path: '/',
					title: homePageLabels.title,
					state: {
						metaData: metaData,
						newestArticles: res.locals.articles
					}
				}

				renderApp( context, function( err, html ) {
					if( err ) {
						return console.log( err );
					}

					res.send( html );
				});
			}
		);

		app.get(
			'/editor',
			function( req, res ) {

				var context = {
					path: '/editor',
					title: editorLabels.title,
					state: {
						metaData: metaData
					}
				}

				renderApp( context, function( err, html ) {
					if( err ) {
						return console.log( err );
					}

					res.send( html );
				});
			}
		);

		app.use( express.static( staticPath ));

		app.get(
			'/:slug',
			ArticleMiddleware.loadArticle(),
			function( req, res, next ) {
				if( !req.accepts( 'html' )) {
					return next();
				}

				var article = res.locals.article;
				var context = {
					path: '/' + req.params.slug,
					title: article.title,
					state: {
						metaData: [
							{ name: 'description', content: article.description },

							{ name: 'twitter:card', content: 'summary_large_image' },
							{ name: 'twitter:site', content: '@kasraonline' },
							{ name: 'twitter:title', content: article.title },
							{ name: 'twitter:description', content: article.description },
							{ name: 'twitter:creator', content: '@author_handle' },

							{ name: 'twitter:image:src', content: article.headerImage.url },

							{ property: 'og:title', content: article.title },
							{ property: 'og:type', content: 'article' },
							{ property: 'og:url', content: 'http://kasra.co/' },
							{ property: 'og:image', content: article.headerImage.url },
							{ property: 'og:description', content: article.description },
							{ property: 'og:site_name', content: 'Kasra | كسرة' },
							{ property: 'article:published_time', content: article.publishDate },
							{ property: 'article:modified_time', content: article.date },
							{ property: 'article:section', content: 'Article Section' },
							{ property: 'article:tag', content: 'Article Tag' },
							{ property: 'fb:admins', content: '751451768228843' },

							{ itemType: 'http://schema.org/Article', description: res.locals.article.description }
						],
						article: res.locals.article
					}
				}

				renderApp( context, function( err, html ) {
					if( err ) {
						return console.log( err );
					}

					res.send( html );
				});
			}
		);

		// TODO: kasra/app should not need to know that article/app needs a collection. article/app should take responsability for it's own data store requirements by requesting a collection from a data store module. article.app should not need an init function.
		// TODO: Move article to the end of the stack, because it always performs a database query for GET requests, regardless of wether it will respond or pass on the request.
		app.use( article.app.init( db.connection.collection( 'articles' ), db.connection.collection( 'images' )));
		app.use( uploader.app.init( db.connection.collection( 'images' )));

		// Register all or the listed custom error handlers
		customErrorHandlers().register(app);

		// Must be mounted after all other routes
		if( 'development' === app.get( 'env' )) {
			app.use( errorHandler() ); // For debugging errors in routes
		}

		// Cleanup on exit / crash / reboot..
		prepareCleanup( app );

		return app;
	}
};
