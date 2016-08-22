'use strict';

var _ = require('lodash');

function Uploader(files,route,options) {
    var that = this;

    options = options || {}; 
    
    this.options = _.defaults(options,{
        headers: [],
        handlers: {},
        method: 'POST',
        mode: 'multipart'
    });

    if(['multipart','raw'].indexOf(this.options.mode) === -1) {
        throw new Error('Unsupported method!');
    } else if(this.options.mode === 'multipart' && !FormData) {
        throw new Error('FormData object is not supported, cannot upload multipart data!');
    } 

    this.route = route;
    this.fileList = files;
    
    _.keys(this.options.handlers).forEach(function(name) {
        that[name] = that.options.handlers[name]; 
    });

}


Uploader.prototype.fileList = null;

Uploader.prototype.onFinish = function(response,file) {
    return console.log('finished!');
};

Uploader.prototype.onProgress = function(percent, status) {
    return console.log('progress: ', percent, status);
};

Uploader.prototype.onError = function(status) {
    return console.log('error: ', status);
};

Uploader.prototype.process = function(method) {

    if(!this.fileList) {
        return false;
    }

    this.onProgress(0, 'Upload started.');

    if(this.fileList.length) {
         for (var i=0; i < this.fileList.length; i++) {
            this['upload'+method](this.fileList.item(i));
        }
    }
};

Uploader.prototype.loadImage = function(file,callback) {
    var img;
   
    img = new Image();
    img.onload = function () {
        callback({w: this.width, h: this.height});
    };
    img.src = URL.createObjectURL(file);
    img.onerror= function() {
        callback(null,new Error('Invalid file type..'))
    }; 
}

Uploader.prototype.init = function() {
    var xhr = new XMLHttpRequest();
    xhr.open(this.options.method,this.route);

    return xhr;
}

Uploader.prototype.uploadImage = function(file) {


    var that = this;
    var xhr = this.init();

    this.loadImage(file,function(res,err) {
        if(err) {
            throw new Error(err);
        }

        xhr.setRequestHeader('Image-Dimension-X', res.w);
        xhr.setRequestHeader('Image-Dimension-Y', res.h);
        xhr.setRequestHeader('Image-Type', file.type);
        xhr.setRequestHeader('Image-Filesize', file.size); 

        that.upload(file,xhr);

    })    

}

Uploader.prototype.upload = function(file,xhr) {

    var postData = null;
    var that = this;

    if(this.options.mode === 'multipart') {
        postData = new FormData();
        postData.append('uploadedImage', file);

        if(this.options.data) {
            _.keys(this.options.data).forEach(function(key) {
                postData.append(key, that.options.data[key]);
            })      
        }
    } else {
        postData = file;
        xhr.setRequestHeader('Content-Type', file.type);

    }

    xhr.setRequestHeader('X-KasraImageUploader', true);

    this.options.headers.forEach(function(header) {
        xhr.setRequestHeader(header.name, header.value);
    })

    xhr.onload = function() {
            var resp = null;
            try {
                resp = JSON.parse(xhr.responseText);
            }
            catch(e) {
                resp = e;
            }
            if (xhr.status === 200) {
                this.onProgress(100, 'Upload completed.');
                return this.onFinish(resp,file);
            } else {
                return this.onError('Upload error: ' + xhr.status);
            }
    }.bind(this);
    
    xhr.onerror = function() {
            return this.onError('XHR error.');
    }.bind(this);
        
    xhr.upload.onprogress = function(e) {
            var percentLoaded;
            if (e.lengthComputable) {
                percentLoaded = Math.round((e.loaded / e.total) * 100);
                return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.');
            }
    }.bind(this);


    return xhr.send(postData);
};

module.exports = Uploader;