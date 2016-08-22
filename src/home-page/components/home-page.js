var React = require('react');
var Reflux = require( 'reflux' );

var Layout = require( '../../kasra/components/layout.js' );
var ArticleExcerpt = require('../../article/components/article-excerpt');
var Editor = require('../../article-editor/components/article-editor');
var homepageArticleStore = require( '../stores/homepage-article-store' );
var actions = require( '../actions' );
var labels = require( '../labels' );

var HomePage = module.exports = React.createClass({
	contextTypes: {
		state: React.PropTypes.shape({
			newestArticles: React.PropTypes.array.isRequired,
		}).isRequired
	},

	mixins: [ Reflux.listenTo( homepageArticleStore, 'updateArticles', function() {
		return this.context.newestArticles;
	})],

	// When the component is first mounted to the virtual DOM, load articles
	componentDidMount: function() {
		actions.loadHomeArticles();
	},

	// When the article store notifies us that the list of articles has changed, update our state to match it
	updateArticles: function( articles ) {
		this.setState({
			newestArticles: articles
		});
	},

	render: function() {
		var articles = ( this.state && this.state.newestArticles )? this.state.newestArticles: this.context.state.newestArticles;

		function renderArticleExcerpt( article ) {
			return (
				<ArticleExcerpt key={ article._id } {...article} />
			);
		}

		return (
			<Layout title={ labels.title } >
				<div className="homePage">
					<h1>HomePage</h1>
					<div id="tabContent" className="floatfix">
						<section id="newest" className="kasraNewest">
							{ articles.map( renderArticleExcerpt )}
						</section>
					</div>
				</div>
			</Layout>
		);
	}
});
