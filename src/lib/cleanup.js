'use strict';

module.exports = function Cleanup(app) {

	process.on('SIGINT', function() {
		process.exit();
	});

	process.on('SIGHUP', function() {
		process.exit();
	});

	process.on('SIGTERM', function() {
		process.exit();
	});

	process.on('exit', function() {

		var db = app.get('db');

		console.log('Exiting.. cleanup');

		if(db && db.connection) {
			db.connection.close();
		}
	});

}
