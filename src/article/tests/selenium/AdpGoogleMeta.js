'use strict';

var By = require('selenium-webdriver').By,
	AdpGoogleMeta = require('./AdpGoogleMetaModel.js'),
	util = require('util'),
    BasePage = require('../../../lib/BasePage.js');

function AdpGoogleMeta(driver) {
    this.init(new AdpGoogleMetaModel(driver, By.tagName('html')));
}

util.inherits(AdpGoogleMeta,BasePage);

AdpGoogleMeta.prototype.isGoogleNameRendered = function (callback) {
   this.ui.googleName.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpGoogleMeta.prototype.isGoogleMetaDescriptionRendered = function (callback) {
   this.ui.googleDescription.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpGoogleMeta.prototype.isGoogleImageRendered = function (callback) {
   this.ui.googleImage.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = AdpGoogleMeta;
