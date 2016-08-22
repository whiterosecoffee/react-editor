'use strict';

var By = require('selenium-webdriver').By,
	AdpMeta = require('./AdpMetaModel.js'),
	util = require('util'),
    BasePage = require('../../../lib/BasePage.js');

function AdpMeta(driver) {
    this.init(new AdpMetaModel(driver, By.tagName('html')));
}

util.inherits(AdpMeta,BasePage);

AdpMeta.prototype.isTitleTagRendered = function (callback) {
   this.ui.titleTag.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpMeta.prototype.isMetaDescriptionRendered = function (callback) {
   this.ui.metaDescription.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = AdpMeta;
