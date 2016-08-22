var React = require('react');
var status = require( '../status' );
var labels = require( '../labels' );
var actions = require( '../actions' );
var store = require( '../article-editor-store' );
var FileUpload = require( '../../uploader/components/file-upload' );
var createEditActor = require( '../lib/create-edit-actor' );

var BlockText = module.exports = React.createClass({

	getDefaultProps: function() {
		return {
			optionalHeadline: '',
			via: '',
			body: ''
		};
	},

	render: function() {
		return (
			<section className="blockText editorBlock">
				<h2>BlockText</h2>
				<label className="blockOptionalHeadline">
					<input
						onChange={ createEditActor( 'optionalHeadline' )}
						type="text"
						placeholder={ labels.headlinePlaceholder }
						value={ this.props.optionalHeadline } />
					<span>{ 255 - this.props.optionalHeadline.length }</span>
				</label>

				<textarea
					onChange={ createEditActor( 'body' )}
					className="editorContent editorInput"
					placeholder={ labels.content }
					value={ this.props.body } />

				<label>{ labels.via }
					<input
						type="text"
						placeholder={ labels.viaPlaceholder }
						onChange={ createEditActor( 'via' )}
						value={ this.props.via } />
				</label>
			</section>
		);
	}

});
