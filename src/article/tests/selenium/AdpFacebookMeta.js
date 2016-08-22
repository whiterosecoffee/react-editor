'use strict';

var By = require('selenium-webdriver').By,
	AdpFacebookMeta = require('./AdpFacebookMetaModel.js'),
	util = require('util'),
    BasePage = require('../../../lib/BasePage.js');

function AdpFacebookMeta(driver) {
    this.init(new AdpFacebookMetaModel(driver, By.tagName('html')));
}

util.inherits(AdpFacebookMeta,BasePage);

AdpFacebookMeta.prototype.isFacebookTitleRendered = function (callback) {
   this.ui.facebookTitle.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookTypeRendered = function (callback) {
   this.ui.facebookType.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookUrlRendered = function (callback) {
   this.ui.facebookUrl.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookImageRendered = function (callback) {
   this.ui.facebookImage.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookDescriptionRendered = function (callback) {
   this.ui.facebookDescription.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookSiteNameRendered = function (callback) {
   this.ui.facebookSiteName.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookPublishedTimeRendered = function (callback) {
   this.ui.facebookPublishedTime.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookModifiedTimeRendered = function (callback) {
   this.ui.facebookModifiedTime.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookTagRendered = function (callback) {
   this.ui.facebookTag.isElementPresent().then(function(ok){
        callback(ok);
   })
};
AdpFacebookMeta.prototype.isFacebookAdminsRendered = function (callback) {
   this.ui.facebookAdmins.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = AdpFacebookMeta;
