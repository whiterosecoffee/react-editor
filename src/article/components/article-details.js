var React = require('react');
var Reflux = require( 'reflux' );
var moment = require( 'moment' );
var _ = require( 'lodash' );

var articleDetailsStore = require( '../stores/article-details-store' );
var actions = require( '../actions' );

var Layout = require( '../../kasra/components/layout.js' );
var UserComponent = require('../../user-profile/components/user-component');
var DoesNotExist = require( '../../kasra' ).components.DoesNotExist;

var ArticleDetails = module.exports = React.createClass({
	mixins: [
		Reflux.listenTo( articleDetailsStore, 'update' )
	],

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		// Tell the store that we want the article for the slug that was passed throught the route that led us here.
		actions.fetchArticle( this.props.articleSlug );
	},

	update: function( article ) {
		this.setState( article );
	},

	render: function() {
		if( _.isEmpty( this.state )) {
			return <DoesNotExist />
		}

		var dateElement;

		if( this.state.publishDate ) {
			var date = moment( this.state.publishDate ).format( 'D/M/YYYY' );
			dateElement = <time id="articleDate" pubdate dateTime={ date } itemProp="datePublished">{ date }</time>
		} else {
			dateElement = '';
		}

		return (
			<Layout title={ this.state.title }>
				<article id="articleDetails" className="article">
					<h1 id="articleTitle" itemProp="name">{this.state.title}</h1>
					{ dateElement }
					<img id="articleBanner" src={ this.state.headerImage? this.state.headerImage.url: "http://kasra.co/wp-content/uploads/2014/11/سليم-البدري-1200x600-1200x600.jpg" } itemProp="image"/>
					<cite itemProp="citation">Credit <a href={this.state.headerVia} target="_blank">{this.state.credit}</a></cite>
					<h2 itemProp="description">{ this.state.description }</h2>
					<section id="articleContent" itemProp="articleBody">
						<h3 itemProp="alternativeHeadline">{this.state.optionalHeadline}</h3>
						<p>{this.state.body}</p>
						<cite itemProp="citation">Credit <a href={this.state.via} target="_blank">{this.state.via}</a></cite>
					</section>
					<div id="articleAuthor" className="clearfix">
						<UserComponent />
						<p className="authorBio">صحفي وكاتب قصة ومقال. عمل في مجال الترجمة وتحرير الكُتب كمدير تحرير لدار بيت الياسمين للنشر والتوزيع لصاحبها الروائي المصري الكبير إبراهيم عبد المجيد، وبالتوازي عمل في الصحافة التلفزيونية مُعداً لعدد من البرامج مثل ، حتى صار رئيساً لتحرير برنامج على قناة القاهرة والناس</p>
					</div>
				</article>
			</Layout>
		);
	}
});

