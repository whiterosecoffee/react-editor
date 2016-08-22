'use strict';

var React = require( 'react' ),
	Router = require( './router' );

var App = module.exports = React.createClass({
	displayName: 'App',

	contextTypes: {
		title: React.PropTypes.string.isRequired,
		metaData: React.PropTypes.object,
		state: React.PropTypes.object
	},

	render: function() {
		function renderMeta(meta) {return (React.createElement('meta', meta));}

		var serializedContext = 'window.context = ' + JSON.stringify( this.context );

		return (
			<html>
				<head>

					<title>{ this.context.title }</title>

					{ this.context.state.metaData.map( renderMeta )}

					<link rel='stylesheet' type='text/css' href='/index.css' />
				</head>

				<Router />

				<script dangerouslySetInnerHTML={{
					__html: serializedContext
				}} />
				<script src='/index.js'/>
			</html>
		);
	}
});
