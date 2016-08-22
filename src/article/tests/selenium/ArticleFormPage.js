'use strict';

var By = require('selenium-webdriver').By,
	ArticleFormPageModel = require('./ArticleFormPageModel.js'), 
	util = require('util'), 
    BasePage = require('../../../lib/BasePage.js');

function ArticleFormPage(driver) {
    this.init(new ArticleFormPageModel(driver, By.tagName('html')));
}

util.inherits(ArticleFormPage,BasePage);

ArticleFormPage.prototype.submit = function (title, body) {
    this.ui.title.setValue(title);
    this.ui.body.setValue(body);
    return this.ui.submitButton.click();
};

ArticleFormPage.prototype.isRendered = function (callback) {
   this.ui.title.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = ArticleFormPage;