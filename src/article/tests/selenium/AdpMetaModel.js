'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(AdpMetaModel, BasePageModel);

    function AdpMetaModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/123';

        this.ui = _.extend({}, {
            titleTag: this.ef.element(By.tagName('title')),
            metaDescription: this.ef.element(By.xpath('//meta[@name="description"]')),
            twitterDescription: this.ef.element(By.xpath('//meta[@name="twitter:description"]')),
            googleDescription: this.ef.element(By.xpath('//meta[@itemprop="description"]')),
            facebookDescription: this.ef.element(By.xpath('//meta[@property="og:description"]')),
        });
    }

    return AdpMetaModel;
})(Element);
