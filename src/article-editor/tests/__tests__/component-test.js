/** @jsx React.DOM */

jest.dontMock( '../../components/article-editor' );

describe( 'Editor', function() {
	it( 'posts on submit', function() {
		console.log( 'require stuff' );
		var React = require( 'react/addons' );
		var Editor = require( '../../components/article-editor' );
		var store = require( '../../store' );
		var TestUtils = React.addons.TestUtils;

		console.log( 'store:', store );

		var editor = TestUtils.renderIntoDocument(
			<Editor />
		);

		var button = TestUtils.findRenderedDOMComponentWithTag( editor, 'button' );
		TestUtils.Simulate.click( button );
		expect( store.postArticle.mock.calls.length ).toEqual( 1 );
	});
});
