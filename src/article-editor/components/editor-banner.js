var React = require('react');
var status = require( '../status' );
var FileUpload = require( '../../uploader/components/file-upload' );
var store = require( '../article-editor-store');
var actions = require( '../actions');

var EditorBanner = module.exports = React.createClass({

	render: function() {
		return (
			<section id="editorBanner">
				<h2>Featured Image</h2>
				<img id="banner" src="../images/editor-banner.jpg"/>
				<img id="thumbnail" src="../images/editor-banner-thumbnail.jpg"/>
				<FileUpload  store={store}  action={actions.submitArticle} imageType="banner" />
			</section>
		);
	}

});
