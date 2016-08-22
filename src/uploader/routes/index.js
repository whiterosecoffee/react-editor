'use strict';

var config = require("../../kasra/local-config.json"),
fs = require('fs'),
_ = require('lodash'),
async = require('async'),
uuid = require('uuid'),
AWS = require('aws-sdk'),
ImagesModel = require( '../models/images' ),
Joi = require('express-validation/node_modules/joi');


module.exports = {
	uploads3: function configureUpload(imageCollection) {
		
		return function uploads3(req, res, next) {

			var model = new ImagesModel( imageCollection )

			if(!req.get('X-KasraImageUploader')) {
				return next();
			}

			var s3Stream = null, arr = null, key = null;

			AWS.config.update(config.amazon_s3);

			s3Stream = require('s3-upload-stream')(new AWS.S3());

			arr = new Array(16);
			uuid.v1(null, arr, 0);
			key = uuid.unparse(arr)+req.validatedImage.format;

			async.series([
				function(callback){
					
					if(req.method === 'POST') {
						callback(null);
					} else {
						model.getByArticleID(req.body._id,function(err, res) {
							if(res) {
								key = res.url.substr(res.url.lastIndexOf('/')+1);
							}
							callback(err);
						});	
					}
				}
				],
				function(err) {

					if(err) {
						return res.status(400).json(err);
					}

					var upload = s3Stream.upload({
					  "Bucket": config.amazon_s3.Bucket,
					  "Key": key,
					  "ACL": 'public-read'
					});

					upload.maxPartSize(20971520);
					upload.concurrentParts(5);


					upload.on('error', function (error) {
						res.status(400).json(error);
					});


					// TODO: the callback can be used to implement progress indicators..

					//upload.on('part', function (details) {
						 
					//});

					upload.on('uploaded', function (details) {
						
						req.validatedImage.amazonLocation = details.Location; 
						
						fs.unlink(req.validatedImage.tmpName,function(err) {
							if(err) {
								res.status(400).json(err);
							}
							next();

						});

					});

					req.validatedImage.stream.pipe(upload);
				});

		};
	}
}
