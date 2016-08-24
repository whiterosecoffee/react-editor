# Editorial CMS - Online Magazine
Custom Headless CMS / SPA.  Team developed in a scrum environment.   

Primarily resopnsible for creating stateful components and actions, connecting to Express endpoints, front end routing, styling output and testing front end components.  Implemented Labels system for multi language support

####Tech Stack
**React, Mongo, Express
**Gulp, Bower, Git, React Router, jshint(http://felixge.de/), Selinium, Chai, Underscore, Lodash


## File structure

	.
	├── dist - The client side of the app.
	│   ├── index.css - Compiled CSS
	│   ├── index.css.map - A sourcemap for the generated css. Ensures that inspected styles refer to the original source, not the compiler output.
	│   ├── index.html
	│   ├── index.js - Our client side code
	│   └── vendor.js - Bundled JS dependencies
	├── src
	│   ├── article - An example of a distinct module. Contains client and server code in an isomorphic form.
	│   │   ├── components - React components.
	│   │   ├── images - Static image assets used only by this module.
	│   │   ├── lib - Helper functions for this module.
	│   │   ├── models - Helper objects that map to the DB schema. Reduces the need for direct database manipulation in server side code.
	│   │   ├── middleware - Express middleware.
	│   │   ├── routes - Express routes (end of chain middleware).
	│   │   ├── stores - React stores.
	│   │   ├── styles - Sass stylesheets, must be referenced from index.scss.
	│   │   ├── readme.md - Documentation for this module. [link](src/article/readme.md)
	│   │   ├── app.js - An article app that can be mounted in an Express app.
	│   │   └── index.js - The code level interface for this module. External modules should not `require()` anything that is not exported here.
	│   ├── index.html - SPA markup template. Script and style links are inserted during the build.
	│   ├── index.js - The root of the React client app
	│   ├── index.scss - The root index of stylesheets. Should only contain includes.
	│   └── server.js - The root of the Express server app.
	├── bower.json - Specifies dependencies on static assets and client side modules.
	├── gulpfile.js - Build script. `gulp watch` will run it when source files change.
	├── javascript-style-guide.md - The Menapost style guide
	├── package.json - Specifies dependencies on JS assets, for both client and server.
	└── readme.md

## Prerequisites

This project runs on [Node](http://nodejs.org/), so you will need to have that installed, along with the NPM package manger (included). You'll also need MongoDB 2.6+.

Make sure that NPM installs modules to a directory that does not require root access, such as `$HOME/npm`. You can configure NPM by creating a `.npmrc` in your home directory and settin the install prefix like so:

	prefix=/home/your-username/npm

Some client side dependencies are managed using bower. The build system uses Gulp. Both of these can be installed via NPM:

	npm install -g bower gulp

You will also need to have a MongoDB server installed. 

Finally, you need to install imagemagick and graphicsmagick libraries as well.

If you are on Mac, you need to make sure that command line dev tools (like gcc, make etc) are installed. Try "make" in terminal. Newer versions of OS X should pop up dialog and install
the required stuff automatically. If this doesn't work, you can download XCode from Apple.

You can find some short instructions below. For more details, check out the offical docs. 

- Mongodb [install instructions](docs.mongodb.org/manual/installation/).
- Imagemagick [download page](http://www.imagemagick.org/script/binary-releases.php).
- Graphicsmagick [download page](http://www.graphicsmagick.org/download.html).
- XCode [download page](https://developer.apple.com/xcode/downloads/)

(Mac) Install homebrew:

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

(Mac) Install imagemagick and graphicsmagick libraries:

	brew install imagemagick
	brew install graphicsmagick

(Ubuntu / Debian) Install imagemagick and graphicsmagick libraries:

	sudo apt-get install imagemagick
	sudo apt-get install graphicsmagick

Installing Mongodb:

[Download it](https://www.mongodb.org/downloads) and unpack the file somewhere.

	mkdir ~/data
	vim ~/.profile
	Add /mongodb/install/location/bin directory to the PATH variable (i.e.: export PATH=/Users/tamasgeschitz/mongodb/bin:/usr/local/mysql/bin:$PATH)
	source ~/.profile
	in new terminal start up mongod: mongod --dbpath ~/data

Copy `src/***.json` to `src/***/local-config.json` and update it for the configuration that is specific to your local machine. This is for configuring the database connection between the Node server and the MongoDB server. `local-config.json` will often be different depending on where the site is running, so it should not be versioned.

Add the follwoing amazon S3 settings to this config file:

	"amazon_s3": {
			"accessKeyId": "",
			"secretAccessKey": "",
			"Bucket": ,
			"region": 
	}

## Getting Started


Install dependencies:

	npm install
	bower install

Run the example test:

	gulp test

Build the client side distribution, test, start a server and keep rebuilding it whenever the client side source changes:

	gulp watch

The site will be available on [localhost:3000](localhost:3000).



