var React = require('react');
var status = require( '../status' );
var labels = require( '../labels' );
var actions = require( '../actions' );
var store = require( '../article-editor-store' );
var createEditActor = require( '../lib/create-edit-actor' );

var FileUpload = require( '../../uploader/components/file-upload' );

var ArticleHeader = module.exports = React.createClass({

	getDefaultProps: function() {
		return {
			title: '',
			image: {
				large: '/images/editor-banner.jpg',
				thumb: '/images/editor-banner-thumbnail.jpg'
			},
			credit: '',
			description: '',
			via: ''
		};
	},

	render: function() {
		return (
			<header id="articleHeader" className="editorBlock">
				<h1>New Post</h1>

				<label>
					<input
						id="articleHeaderTitle"
						onChange={ createEditActor( 'title' )}
						type="text"
						placeholder={ labels.title }
						value={ this.props.title } />
					<span>{100 - this.props.title.length}</span>
				</label>

				<textarea
					placeholder="Add a Description"
					onChange={ createEditActor( 'description' )} />

				<section id="headerBanner">
					<h2>Featured Image</h2>
					<img id="bannerLarge" src={ this.props.image.large } />
					<img id="bannerThumb" src={ this.props.image.thumb } />
					<FileUpload  store={store} action={actions.submitArticle} imageType="headerImage" />
					<label>Image Credit<input type="text" placeholder="..." onChange={ createEditActor( 'credit' )} /></label>
					<label>Via<input type="text" placeholder="?Where did you find it (URL)" onChange={ createEditActor( 'headerVia' )}/></label>
				</section>
			</header>
		);
	}

});

