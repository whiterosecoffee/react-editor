'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(ArticleDetailsPageModel, BasePageModel);

    function ArticleDetailsPageModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/123';

        this.ui = _.extend({}, {
            article: this.ef.element(By.id('articleDetails')),
            articleBanner: this.ef.element(By.id('articleBanner')),
        });
    }

    return ArticleDetailsPageModel;
})(Element);
