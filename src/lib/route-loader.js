'use strict';

var Walker = require('walker');
var path = require('path');
var util = require('util');


function RouteRegister (app,callback) {

	var basepath = path.join(__dirname,'../');
	var that = this;
	var exclude = ['bower_components','lib']
	.map(function(item) {
		return path.join(basepath,item);
	});

	Walker(basepath)
	.filterDir(function(dir, stat) {
		if (exclude.indexOf(dir) !== -1) {
			return false;
		}
		return true;
	})
	.on('dir', function(dir, stat) {
		if(dir.indexOf('middleware/routes') !== -1) {
			try {
				require(dir)(app);
				console.log('Loaded route %s',dir);
			}
			catch(e) {
				callback(util.format('Could not load route %s. Error: %s'),dir,e);
			}
			
		}
	})
	.on('error', function(er, entry, stat) {
		callback(util.format('Could not load route %s. Error: %s!',entry,er));
	})
	.on('end', function() {
		console.log('Loaded all routes!');
		callback();
	});
}


module.exports = function(app,callback) {
	return new RouteRegister(app,callback);
}