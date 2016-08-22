var React = require( 'react' ),
	router = require( 'react-router-component' ),
	Link = router.Link;

var Nav = module.exports = React.createClass({
	render: function() {
		return (
			<ul id='topNav' className='clearfix'>
				<li><Link href='/' >Home</Link></li>
				<li><Link href='/editor' >Editor</Link></li>
			</ul>
		);
	}
});
