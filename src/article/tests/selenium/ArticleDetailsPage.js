'use strict';

var By = require('selenium-webdriver').By,
	ArticleDetailsPageModel = require('./ArticleDetailsPageModel.js'),
	util = require('util'),
    BasePage = require('../../../lib/BasePage.js');

function ArticleDetailsPage(driver) {
    this.init(new ArticleDetailsPageModel(driver, By.tagName('html')));
}

util.inherits(ArticleDetailsPage,BasePage);

ArticleDetailsPage.prototype.isRendered = function (callback) {
   this.ui.article.isElementPresent().then(function(ok){
        callback(ok);
   })
};
ArticleDetailsPage.prototype.isArticleBannerRendered = function (callback) {
   this.ui.articleBanner.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = ArticleDetailsPage;
