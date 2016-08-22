/** @jsx React.DOM */
var React = require('react');
var Reflux = require( 'reflux' );

var labels = require( '../labels' );
var actions = require( '../actions' );
var store = require( '../article-editor-store' );
var Layout = require( '../../kasra/components/layout.js' );
var ArticleHeader = require('../components/article-header');
var BlockText = require('../components/block-text');
var EditorFlowBtns = require('../components/editor-flow-btns');

var Editor = module.exports = React.createClass({
	mixins: [ Reflux.listenTo( store, 'update' )],

	componentDidMount: function() {
		actions.clear();
		this.replaceState( {} );
	},

	update: function( state ) {
		this.setState( state );
	},

	onSubmit: function( event ) {
		actions.submitArticle( this.state );
		event.preventDefault();
	},

	render: function() {

		return (
			<Layout title={ labels.title } >
				<div id="editor">
					<EditorFlowBtns onSubmit={ this.onSubmit } />
					<ArticleHeader { ...this.state } />
					<BlockText { ...this.state } />
				</div>
			</Layout>
		);
	}
});
