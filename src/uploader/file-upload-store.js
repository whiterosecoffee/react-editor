var Reflux = require( 'reflux' );
var request = require( 'superagent' );
var _ = require( 'lodash' );

var actions = require( './actions' );
var status = require( '../article-editor/status' );
var Uploader = require( '../lib/uploader' );

var UploadStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo( actions.uploadImageToS3, this.uploadImageToS3 );
	},

	uploadImageToS3: function(props, files, done ) {

		var options = _.defaults({
			headers: [
				{ name: 'Accept', value: 'application/json' }
			]
		},props);

		var uploader = new Uploader(files,'/uploads3',options).process('Image');

		this.trigger({ status: status.sending });
	},

	receiveImageResponse: function(res ) {

		if( !res.ok ) {
			return console.error( 'Unable to save article: ', err );
		}

		this.trigger({
			title: res.body.title,
			status: status.saved
		});
	}
});
