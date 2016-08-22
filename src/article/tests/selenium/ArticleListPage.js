'use strict';

var By = require('selenium-webdriver').By,
	ArticleListPageModel = require('./ArticleListPageModel.js'), 
	util = require('util'), 
    BasePage = require('../../../lib/BasePage.js');

function ArticleListPage(driver) {
    this.init(new ArticleListPageModel(driver, By.tagName('html')));
}

util.inherits(ArticleListPage,BasePage);

ArticleListPage.prototype.isRendered = function isRendered(title,callback) {
    this.model.hasArticle(title,callback)
};

module.exports = ArticleListPage;