var Reflux = require( 'reflux' );
var request = require( 'superagent' );

var actions = require( '../actions' );

var articleDetailsStore = module.exports = Reflux.createStore({
	init: function() {
		this.article = {};

		this.listenTo( actions.fetchArticle, this.fetchArticle );
	},

	fetchArticle: function( slug ) {

		request.get( '/' + slug )
		.set( 'Accept', 'application/json' )
		.end( function handleResponse( res ) {
			if( !res.ok ) {
				return console.log( 'Failed to fetch article details:', res.error );
			}

			this.receiveArticle( res.body );
		}.bind( this ));
	},

	receiveArticle: function( article ) {
		this.trigger( article );
	}
});
