var React = require( 'react' );
var Layout = require( '../../kasra/components/layout.js' );
var Router = require( 'react-router-component' );
var Link = Router.Link;

var labels = require( '../labels' );

var DoesNotExist = module.exports = React.createClass({
	render: function() {
		return(
			<Layout title='Not found'>
				<div>
					<p>{ labels.missingContentMessage }</p>
					<Link href='/'>{ labels.homeLink }</Link>
				</div>
			</Layout>
		);
	}
});
