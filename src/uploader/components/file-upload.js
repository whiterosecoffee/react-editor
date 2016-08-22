var React = require('react');
var Reflux = require( 'reflux' );

var actions = require('../actions');
var status = require( '../../article-editor/status' );

var ReactUploader = module.exports = React.createClass({
	//mixins: [ Reflux.listenTo( this.props.store, 'update' )],

    fileList: null,

    componentDidMount: function() {

        if(!this.props.store) {
            throw new Error('No store specified: ');
        }

        if(!(this.props.action instanceof Function)) {
            throw new Error('Invalid action specified: '+this.props.action);
        }

        this.unsubscribe =  this.props.store.listen( this.update );
    },

    componentWilllUnmount: function() {
        this.unsubscribe();
    },

    update: function( state ) {
		if( this.isMounted() ) {
			this.setState( state );
		}
    },

    onChangeImage: function( event ) {
        this.props.files = event.target.files;
        this.props.action(this.props);
    },

    onSubmit: function( event ) {
        this.props.action(this.props);
        event.preventDefault();
    },


    render: function() {
        return (
			<div className="uploader">
				<div className="uploaderBtns">
					<div className="editorSecondaryBtn uploaderChooseFileBtn">
						<input type="file" id="foo" className="fileInput" name="upload" onChange={ this.onChangeImage } multiple="true" />
						<img src="../images/upload.png" height="25" width="25" />
					</div>
				</div>

			</div>
        );
    }

});
