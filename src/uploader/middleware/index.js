'use strict';

var ImagesModel = require( '../models/images' ),
path = require('path'),
mmm = require('mmmagic'),
gm = require( 'gm' ),
uuid = require('uuid'),
validators = require( '../validators' ),
fs = require('fs'),
_ = require('lodash'),
slug = require('slug'),
Joi = require('express-validation/node_modules/joi');


module.exports = function init(imageCollection) {
	var model = new ImagesModel( imageCollection );
	return {
			saveImageData: function(req,res) {

				var data = {
					imageType: req.get('X-Picture-Type'),
					articleId: req.validatedImage.article._id,
					url: req.validatedImage.amazonLocation,
					imageSlug: slug(req.validatedImage.fileName),
					created_at: new Date().toISOString()
				};


				model.updateOrCreateAndFetchByPK(data.articleId,data,function(err,response) {

					if(err) {
						return res.status(400).json(err);
					}

					return res.status(200).json(req.validatedImage.article);

				});
			},
			validateImage: 	function validation( req, res, next ) {

				var validatedImage = null;

				if(!req.get('X-KasraImageUploader')) {
					return next();
				}

				req.pipe(req.busboy);

				req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
					req.body[fieldname] = val;
			    });

				req.busboy.on('file', function (fieldname, file, filename) {

					var dataArr = [];
					var mimeChecked = false;
					var tmpFile = null;
					var tmpWriteStream = null;
					var ext = filename.substr(filename.lastIndexOf('.'));
					var arr = new Array(16)
					var imageData = new Buffer(200);

					function error(err) {
						if(err) {
							res.status( 400 ).json( err );

							fs.exists(tmpFile,function(there) {
								if(there) {
									fs.unlink(tmpFile,function(err) {
										if(err) {
											console.error(err);
										}
									});
								}
							});
						}

						return err;
					}


					uuid.v1(null, arr, 0);
					tmpFile =  path.join(__dirname,'../../../uploads/'+uuid.unparse(arr)+ext);
					tmpWriteStream = fs.createWriteStream(tmpFile);


					file.on('data',function(chunk) {
						dataArr.push(chunk);

						if(imageData.length < 500) {
							imageData =  Buffer.concat(dataArr);
						} else {
							if(!mimeChecked) {
								new mmm.Magic(mmm.MAGIC_MIME_TYPE).detect(imageData, function(err, result) {

									Joi.validate({
										mime: result
									}, validators.newImageMIME, function(err,value) {
										error(err);
									});
									mimeChecked = true;

								});
							}
						}

						tmpWriteStream.write(chunk);

					});


					file.on('end',function() {

						tmpWriteStream.end();

							fs.readFile(tmpFile,function(err,data) {
								var validationData = {
									filesize: data.length
								}

								error(err);

								gm(data, 'image')
								.format(function(err,value) {
									error(err);

									validationData = _.extend(validationData,{format: value.toLowerCase()});

								})
								.size(function(err, value){

									error(err);

	  								validationData = _.extend(validationData,value);


	  							Joi.validate(validationData, validators.newImage, function(err,value) {

									if(err) {
										error(err);
									} else {

										req.validatedImage = {
											stream: fs.createReadStream(tmpFile),
											fileName: filename,
											tmpName: tmpFile,
											format: ext
										}

										next();
									}
								});
							});
						});
					});
				})
			}
	}
}
