var Reflux = require( 'reflux' );
var request = require( 'superagent' );
var _ = require( 'lodash' );

var actions = require( './actions' );
var status = require( './status' );
var Uploader = require( '../lib/uploader' );
var _ = require( 'lodash' );

var ArticleEdtitorStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo( actions.submitArticle, this.submitArticle );
		this.listenTo( actions.editField, this.editField );
		this.listenTo( actions.clear, this.clear );
		this.article = {};
	},

	submitArticle: function( article ) {
		this.postArticle( article, this.receiveArticleResponse.bind( this ));
	},

	postArticle: function( args, done ) {

		var options = null;

		if(args && args.files) {
			options = _.defaults({
				headers: [
					{ name: 'Accept', value: 'application/json' },
					{ name: 'X-Picture-Type', value: args.imageType }
				],
				method: this.article._id ? 'PUT' : 'POST',
				data: this.article,
				handlers: {
					onFinish: done
				}
			},args);

			new Uploader(args.files,'/article',options).process('Image');

		} else {

			var method = this.article._id ? 'put' : 'post';

			request[method]( '/article' )
			.send(this.article)
			.set( 'Accept', 'application/json' )
			.end( done );
		}
	},

	editField: function( fieldName, value ) {
		var change = {};
		change[ fieldName ] = value;

		this.article = _.extend(this.article,change);

		this.trigger( change );
	},

	clear: function() {
		this.article = {};
	},

	receiveArticleResponse: function(res) {

		res = res.xhr ? res.body : res;

		if(!res._id ) {
			return console.error( 'Unable to save article: ', res );
		}

		var article = _.extend( res, { status: status.saved });

		this.article = article;

		this.trigger( article );
	}
});
