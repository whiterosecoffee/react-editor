'use strict';

var React = require( 'react' ),
	HomePage = require('../../home-page/components/home-page'),
	Editor = require('../../article-editor/components/article-editor'),
	ArticleDetails = require('../../article/components/article-details'),
	DoesNotExist = require( './does-not-exist' ),
	router = require( 'react-router-component' ),
	Pages = router.Pages,
	Page = router.Page,
	NotFound = router.NotFound;

var Router = module.exports = React.createClass({
	contextTypes: {
		path: React.PropTypes.string // Required, but only when server side rendering
	},

	render: function() {
		return (
			<Pages path={ this.context.path }>
				<Page path='/' handler={ HomePage } />
				<Page path='/editor' handler={ Editor } />
				<Page path='/:articleSlug' handler={ ArticleDetails } />
				<NotFound handler={ DoesNotExist } />
			</Pages>
		);
	}
});
