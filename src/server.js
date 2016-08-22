'use strict';

var mongodb = null,
	path = require( 'path' ),
	fs = require( 'fs' ),
	prg = require('commander'),
	kasraApp = require( './kasra/app' );

var appConfig = require( './kasra/app-config' ),
	root = path.join( __dirname, '..' ),
	staticPath = path.join( root, appConfig.distDir ),
	port = process.env.PORT || 3000;


prg.version('2.0.0').
option('-t, --test <boolean>', 'Test mode connects to test database.',false).
parse(process.argv);

if(prg.test) {
	prg.test = true;
}

mongodb = require( './lib/mongo-connect' )(prg.test)
.connect(function(err,mongoHandler) {
	if(err) {
		return console.log('Could not connect to mongodb %s',err);
	}

	var app = kasraApp.create( mongoHandler, staticPath );

	var server = app.listen( port, function started() {
		app.set( 'host', server.address().address );
		app.set( 'port', server.address().port );

		console.log( 'Serving', staticPath, 'at', app.get( 'host' ), 'on port', port, 'test mode: ', prg.test );
	});
});

fs.exists( path.join( __dirname, '../uploads' ), function( exists ) {
	if( !exists ) {
		fs.mkdir( path.join( __dirname, '../uploads' ), '0775', function( err ) {
			if( err ) {
				console.err( 'Failed to create uplaods dir' );
			}
		});

		console.log( 'Created uploads dir' );
	}
});
