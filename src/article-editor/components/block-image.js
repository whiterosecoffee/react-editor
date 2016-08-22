var React = require('react');
var status = require( '../status' );
var FileUpload = require( '../../uploader/components/file-upload' );
var store = require( '../article-editor-store');
var actions = require( '../actions');

var BlockImage = module.exports = React.createClass({

	getInitialState: function() {
		return {
			via: '',
			credits: '',
			description: '',
			status: status.unchanged
		};
	},


	onChangeDescription: function( event ) {
		this.setState({
			description: event.target.value,
			status: status.modified
		});
	},

	onChangeVia: function( event ) {
		this.setState({
			via: event.target.value,
			status: status.modified
		});
	},


	onChangeCredits: function( event ) {
		this.setState({
			credits: event.target.value,
			status: status.modified
		});
	},

	render: function() {
		return (
			<section className="editorBlock blockImage">
				<h2>BlockImage</h2>
				<label className="blockOptionalHeadline"><input type="text" placeholder="Optional Headline"/><span>255</span></label>
				<div className="imageDropZone">
					<FileUpload store={store} action={actions.submitArticle} imageType="blockImage"/>
				</div>
				<textarea placeholder="Add a Description" onChange={this.onChangeDescription }></textarea>
				<label>Image Credit<input type="text" placeholder="..." onChange={this.onChangeCredits } /></label>
				<label>Via<input type="text" placeholder="?Where did you find it (URL)" onChange={this.onChangeVia }/></label>
			</section>
		);
	}

});
