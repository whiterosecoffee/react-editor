'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    slug = require('arslugify'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(ArticleListPageModel, BasePageModel);

    function ArticleListPageModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/';

        this.ui = _.extend({}, {
            article: this.ef.element(By.className('tileTitle')),
        });
    }


    ArticleListPageModel.prototype.hasArticle = function(title,callback) {
        var xpath = '//a[contains(@href,"t-ilh")]';
        if(title instanceof Function) {
            callback = title;
            return this.findByName('article').isElementPresent().then(function(ok) {
                callback(ok);
            });
        } else {
            return this.findByXPath(xpath).isElementPresent().then(function(ok) {
                callback(ok);
            });
        }

    };


    return ArticleListPageModel;
})(Element);
