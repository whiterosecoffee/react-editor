'use strict';

var _ = require( 'lodash' ),
	fs = require( 'fs' ),
	express = require( 'express' ),
	ImageRoutes = require( './routes' ),
	busboy  = require('connect-busboy');


module.exports = {
	init: function createArticleApp( imageCollection,app ) {
		
		var ImageMiddleWare = require( './middleware' )(imageCollection);

		app = app || express();

		app.use(busboy());

		app.post( '/uploads3/',ImageMiddleWare.validateImage, ImageRoutes.uploads3( imageCollection ));

		return app;
	}
};
