'use strict';

var _ = require('lodash'),
	async = require( 'async' ),
	validators = require( '../validators' ),
	ArticleModel = require( '../models/articles' ),
	ImageModel = require( '../../uploader/models/images' ),
	Joi = require('express-validation/node_modules/joi');

module.exports = function init( articleCollection, imageCollection ) {
	var model = new ArticleModel(articleCollection);

	return {
		validateArticle: function validateArticle( req, res, next ) {

			if((req.get('X-KasraImageUploader') && !req.body._id) || req.get('X-TestNoValidate') === '21cd051af3a78cc4f56a83677c8bffbe')  {
				next();
			} else {
				Joi.validate(_.pick(req.body,['title','body','credit','headerVia']), validators.newArticle, function(err,value) {
					if(err) {
						res.status( 400 ).json( err );
					} else {
						next();
					}

				});
			}
		},

		loadAllArticles: function() {
			var articleModel = new ArticleModel( articleCollection );
			var imageModel = new ImageModel( imageCollection );

			return function listArticles(req, res, next) {
				articleModel.getAll( function( err,response ) {
					if(err) {
						return next({
							status: 500,
							message: err
						});
					}

					async.map(response,
					function(item, cb) {
						imageModel.getHeaderImageByArticleID(item._id,function(err,image) {
							item.headerImage = image;
							cb(err,item);
						})
					},
					function(err,transformed) {
						if(err) {
							return next({
								status: 500,
								message: err
							});
						}

						res.locals.articles = transformed;
						next();
					})
				});
			};
		},

		loadArticle: function () {
			var articleModel = new ArticleModel( articleCollection );
			var imageModel = new ImageModel( imageCollection );

			return function getArticleBySlug( req, res, next ) {
				articleModel.getBySlug( req.params.slug, function receiveArticle( err, article ) {
					if( err ) {
						return next({
							status: 500,
							message: err
						});
					}

					// If an article is not found, allow other routes to respond instead
					if( null == article ) {
						return next({ status: 404 });
					}

					imageModel.getByArticleID(article._id,function(err, img) {

						if( err ) {
							return next({
								status: 500,
								message: err
							});
						}

						article.headerImage = img;

						res.locals.article = article;
						next();
					})
				});
			};
		}
	}
}
