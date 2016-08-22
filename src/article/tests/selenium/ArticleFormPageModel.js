'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(ArticleFormPageModel, BasePageModel);

    function ArticleFormPageModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/editor';

        this.ui = _.extend({}, {
            title: this.ef.textbox(By.id('articleHeaderTitle')),
            body: this.ef.textbox(By.className('editorContent')),
            submitButton: this.ef.element(By.id('editorPublishBtn')),
        });
    }

    return ArticleFormPageModel;
})(Element);
