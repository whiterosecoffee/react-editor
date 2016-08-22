var React = require('react');
var Uploader = require('../../lib/uploader');

var ReactUploader = module.exports = React.createClass({

    propTypes: {
        onProgress: React.PropTypes.func,
        onFinish: React.PropTypes.func,
        onError: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onProgress: function(percent, message) {
                console.log('Upload progress: ' + percent + '% ' + message);
            },
            onFinish: function(signResult) {
                console.log("Upload finished: " + signResult.publicUrl)
            },
            onError: function(message) {
                console.log("Upload error: " + message);
            }
        };
    },

    uploadFile: function() {
        new Uploader({
            fileElement: this.getDOMNode(),
            onProgress: this.props.onProgress,
            onFinish: this.props.onFinish,
            onError: this.props.onError
        });
    },

    render: function() {
        return this.transferPropsTo(
            React.DOM.input({type: 'file', onChange: this.uploadFile})
        );
    }

});