'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var actions = require( '../actions' );

var homepageArticleStore = module.exports = Reflux.createStore({

	init: function() {
		this.listenTo( actions.loadHomeArticles, this.loadArticles );
	},

	loadArticles: function() {

		var receiveArticles = function( res ) {

			if( !res.ok ) {
				console.log( 'homepageArticleStore failed to load articles:', res.status, res.err );
			}

			this.trigger( res.body );
		}.bind( this );

		request.get( '/articles' )
			.set( 'Accept', 'application/json' )
			.end( receiveArticles );
	}
});
