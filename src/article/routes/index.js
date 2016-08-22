'use strict';

var _ = require('lodash'),
	Q = require( 'q' ),
	Articles = require( '../models/articles' ),
	slugify = require('../../slugify'),
	appConfig = require( '../../kasra/app-config' );

function listSlugs( collection ) {
	var deferred = Q.defer();

	function returnSlugs( err, articles ) {
		if( err ) {
			return deferred.reject();
		}

		deferred.resolve( articles.map( function( article ) {
			return article.slug;
		}));
	}

	collection.find( {}, { slug: 1, _id: 0 }).toArray( returnSlugs );
	return deferred.promise;
}

module.exports = {
	create: function configureCreateOrUpdateRoute( collection ) {
		var model = new Articles( collection );

		return function createArticle(req, res, next) {
			var article = req.body;

			if( article.title ) {
				listSlugs( collection )
				.then( function( slugs ) {
					var slug = slugify( article.title, appConfig.maxUrlLength, slugs );
					return slug;
				})
				.then( function( slug ) {
					article.slug = slug;

					model.create( article,function(err,response) {
						if(err) {
							return res.status(400).json( err );
						}

						if(!req.get('X-KasraImageUploader')) {
							return res.status(200).json(response[0]);
						} else {
							req.validatedImage.article = response[0];
							next();
						}
					});
				})
				.fail( function( err ) {
					console.trace( 'Save promise failure:', err );
					return res.json( 500, err );
				})
				.done();
			} else {
				article.slug = article.slug || '';
				model.create( article,function(err,response) {
					if(err) {
						return res.status(400).json( err );
					}

					if(!req.get('X-KasraImageUploader')) {
						return res.status(200).json(response[0]);
					} else {
						req.validatedImage.article = response[0];
						next();
					}
				});
			}
		};
	},

	update: function configureCreateOrUpdateRoute( collection ) {
		var model = new Articles( collection );

		return function createArticle(req, res, next) {
			var article = _.omit(req.body, ['_id', 'status']);

			console.log( 'updating', article );

			model.updateAndFetchByPK(req.body._id, article, function(err,response) {
				if(err) {
					console.trace( 'Failed to update article:', err );
					return res.status(400).json( err );
				}

				if(!req.get('X-KasraImageUploader')) {
					return res.status(200).json(response);
				} else {
					req.validatedImage.article = response;
					next();
				}
			});
		};
	},
}
