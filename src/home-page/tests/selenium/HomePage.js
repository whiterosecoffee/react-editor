'use strict';

var By = require('selenium-webdriver').By,
	HomePageModel = require('./HomePageModel.js'),
	util = require('util'),
    BasePage = require('../../../lib/BasePage.js');

function HomePage(driver) {
    this.init(new HomePageModel(driver, By.tagName('html')));
}

util.inherits(HomePage,BasePage);

HomePage.prototype.doesEachTileContainAnImage = function (callback) {
   this.ui.tileImage.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = HomePage;
