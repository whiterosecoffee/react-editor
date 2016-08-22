'use strict';

var MongoClient = require('mongodb').MongoClient;
var localConfig = require( '../kasra/local-config' );
var appConfig = require( '../kasra/app-config' );
var _ = require( 'lodash');
var path = require( 'path');
var url = require( 'url');
var fs = require( 'fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

function MongoConnect(test) {

	var dbKey = test ? 'db_test' : 'db';
	var dbName = localConfig.mongodb[dbKey];
	this.config = _.extend(_.omit(localConfig.mongodb,['db','db_test']),{query: appConfig.mongodb},{pathname: dbName, protocol: 'mongodb', slashes: true});;
	this.connection = null;
}


MongoConnect.prototype.initModels = function initModels(connection) {


		var basePath = path.join(__dirname,'./db')
		var fileNames = [];
		var models = {};

		try {
			fileNames = fs.readdirSync(basePath);
		}
		catch(e) {
			return [new Error('Could not read model dir!'),null];
		}

		fileNames.forEach(function(file){
			var model = path.basename(file,'.js');
			var filePath = path.join(basePath,file);
			models[_(model).capitalize().camelize()] = new (require(filePath))(connection);
		});

		return [null,models];
}


MongoConnect.prototype.getModel = function getModel(componentName,modelName) {

		var model = null;
		var collection = this.connection.collection(modelName);

		try {

			model = new (require(path.join(__dirname,'../',componentName,'models',modelName)))(collection);
		}
		catch(e) {
			return e;
		}

		return model;
}


MongoConnect.prototype.connect = function connect(callback) {

		var that = this;

		MongoClient.connect(url.format(this.config), function(err, mongodb) {
			var res = null;

			if(err) {
				callback(err,null);
			} else {
				that.connection = mongodb;
				callback(null,that)
			}
		});
}

module.exports = function(test) {
	return new MongoConnect(test);
}
