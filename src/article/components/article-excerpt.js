'use strict';
var React = require('react');
var Router = require( 'react-router-component' );
var Link = Router.Link;

var ArticleExcerpt = module.exports = React.createClass({
	render: function() {
		return (
			<article key={ this.props.key } className="articleTile floatfix">
				<h2 className="tileTitle">
					<Link href={ '/' + this.props.slug }>{ this.props.title }</Link>
				</h2>
				<img className="tileThumb" src={ this.props.headerImage? this.props.headerImage.url: "http://kasra.co/wp-content/uploads/2014/11/سليم-البدري-1200x600-1200x600.jpg" }/>
			</article>
		);
	}

});
