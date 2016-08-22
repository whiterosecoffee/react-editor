'use strict';

var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;


var Articles = module.exports = function(collection) {

	this.collection = collection;
}

Articles.prototype.getBySlug = function( slug, callback ) {

	var that = this;

	this.collection.findOne({ slug: slug }, function found( err, result ) {

		if(err) {
			callback( err );
		} else {
			callback( null, result );
		}

	});

};

Articles.prototype.getByPK = function( aid, callback ) {

	var that = this;

	this.collection.findOne({ _id: ObjectId(aid) }, function found( err, result ) {

		if(err) {
			callback( err );
		} else {
			callback( null, result );
		}

	});

};


Articles.prototype.getAll = function(callback) {

	var that = this;

	this.collection
	.find({})
	.sort({ publishDate: -1 })
	.toArray( function found(err, result) {

		if(err) {
			callback(err,null);
		} else {
			callback(null,result);
		}

	});

};


Articles.prototype.create = function(data,callback) {

	var that = this;

	// Ask Mongo to timestamp the document's publishDate field
	// Use UTC timezone or a terminator will be sent back in time to kill your code before it was written
	var article = _.extend( data, {
		publishDate: new Date().toISOString()
	});

	this.collection.insert(article,{safe: true},function inserted(err,res) {
		if(err) {
			callback(err,null);
			console.log( err );
		} else {
			callback(null,res);
		}
	});

};


Articles.prototype.updateAndFetchByPK = function(aid,data,callback) {

	var that = this;

	this.collection.findAndModify({_id: ObjectId(aid)},null,data,{'new': true},function updated(err,res) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,res);
		}
	});

};


Articles.prototype.updateByPK = function(aid,data,callback) {

	var that = this;

	this.collection.update({_id: ObjectId(aid)},data,function updated(err,res) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,res);
		}
	});

};


Articles.prototype.removeById = function(id,callback) {

	var that = this;

	this.collection.remove({_id: ObjectId(id)},function removed(err,ok) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,ok);
		}
	});

};


Articles.prototype.removeOneBySlug = function(slug,callback) {

	var that = this;

	this.collection.remove({slug: slug},{single: true},function removed(err,ok) {
		if(err) {
			callback(err,null);
		} else {
			callback(null,ok);
		}
	});

};
