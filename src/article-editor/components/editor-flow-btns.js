var React = require('react');
var status = require( '../status' );
var labels = require( '../labels' );

var EditorFlowBtns = module.exports = React.createClass({
	render: function() {
		return (
			<div id="editorFlowBtns">
				<button
					id="editorPublishBtn"
					onClick={ this.props.onSubmit }
					type="submit"
					className="editorPrimaryBtn btn">
					{ labels.save }
				</button>
				<button id="editorSaveDraftBtn" className="editorSecondaryBtn btn">Save Draft</button>
				<button id="editorPreviewBtn" className="editorSecondaryBtn btn">Preview</button>
			</div>
		);
	}
});
