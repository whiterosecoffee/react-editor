var React = require( 'react' ),
	Nav = require( './nav' );

var Layout = module.exports = React.createClass({

	// React can only rerender components within the body when rendering in a browser, so we can't make title into a regular component
	componentDidMount: function() {
		// componentDidMount is only used client side, so it is safe to assume that document is available
		document.title = this.props.title;
	},

	render: function() {
		return (
			<div>
				<Nav />
				{ this.props.children }
			</div>
		);
	}
});
