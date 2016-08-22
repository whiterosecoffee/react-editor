'use strict';

var By = require('selenium-webdriver').By,
	AdpTwitterMeta = require('./AdpTwitterMetaModel.js'),
	util = require('util'),
    BasePage = require('../../../lib/BasePage.js');

function AdpTwitterMeta(driver) {
    this.init(new AdpTwitterMetaModel(driver, By.tagName('html')));
}

util.inherits(AdpTwitterMeta,BasePage);

AdpTwitterMeta.prototype.isTwitterCardRendered = function (callback) {
   this.ui.twitterCard.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpTwitterMeta.prototype.isTwitterSiteRendered = function (callback) {
   this.ui.twitterSite.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpTwitterMeta.prototype.isTwitterTitleRendered = function (callback) {
   this.ui.twitterTitle.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpTwitterMeta.prototype.isTwitterDescriptionRendered = function (callback) {
   this.ui.twitterDescription.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpTwitterMeta.prototype.isTwitterCreatorRendered = function (callback) {
   this.ui.twitterCreator.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpTwitterMeta.prototype.isTwitterImageRendered = function (callback) {
   this.ui.twitterImage.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = AdpTwitterMeta;
