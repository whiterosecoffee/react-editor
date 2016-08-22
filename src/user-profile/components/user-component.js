var React = require('react');
// will be used for authors and regular users. ie. user login images.
//rename to be more descriptive?
var UserComponent = module.exports = React.createClass({
	render: function() {
		return (
			<div className="userComponent" itemScope itemType="http://schema.org/Person">
				<img className="userImage" src="http://kasra.co/wp-content/uploads/2014/07/10530687_430681450406387_7730874338000307101_n-576x576.jpg" itemProp="image"/>
				<a className="userName" href="#" rel="author" itemProp="author">
					<span itemProp="givenName">محمد</span>
					<span itemProp="familyName">الوزيري</span>
				</a>
			</div>
		);
	}
});
