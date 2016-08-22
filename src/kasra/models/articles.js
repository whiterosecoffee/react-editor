'use strict';

var _ = require('lodash');


function Articles(conn) {
	
	this.conn = conn.collection('cache');
}


Articles.prototype.getAll = function(callback) {	

	var that = this;	

	this.conn.find({}, function(err, result) {

		if(err) {
			callback(err,null);
		} else {
			callback(null,result);
		}

	 });
	
};



module.exports = Articles;