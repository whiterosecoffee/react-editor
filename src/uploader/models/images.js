'use strict';

var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;


function Images(collection) {

	this.collection = collection;
}

Images.prototype.getBySlug = function( slug, callback ) {

	var that = this;

	this.collection.findOne({ slug: slug }, function found( err, result ) {

		if(err) {
			callback( err );
		} else {
			callback( null, result );
		}

	});

};



Images.prototype.create = function(data,callback) {

	var that = this;

	this.collection.insert(data,{safe: true},function inserted(err,res) {
		if(err) {
			callback(err,null);
			console.log( err );
		} else {
			callback(null,res);
		}
	});

};


Images.prototype.updateOrCreateAndFetchByPK = function(aid,data,callback) {

	var that = this;

	this.collection.findAndModify({articleId: ObjectId(aid)},null,data,{'new': true, upsert: true},function updated(err,res) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,res);
		}
	});

};


Images.prototype.getByArticleID = function(aid,callback) {

	var that = this;

	this.collection.findOne({articleId: ObjectId(aid)},function found(err,res) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,res);
		}
	});

};


Images.prototype.getHeaderImageByArticleID = function(aid,callback) {

	var that = this;

	this.collection.findOne({articleId: ObjectId(aid), imageType: 'headerImage'},function found(err,res) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,res);
		}
	});

};





module.exports = Images;
