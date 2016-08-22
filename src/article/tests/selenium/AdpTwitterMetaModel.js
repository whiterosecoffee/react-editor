'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(AdpTwitterMetaModel, BasePageModel);

    function AdpTwitterMetaModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/123';

        this.ui = _.extend({}, {
            twitterCard: this.ef.element(By.xpath('//meta[@name="twitter:card"]')),
            twitterSite: this.ef.element(By.xpath('//meta[@name="twitter:site"]')),
            twitterTitle: this.ef.element(By.xpath('//meta[@name="twitter:title"]')),
            twitterDescription: this.ef.element(By.xpath('//meta[@name="twitter:description"]')),
            twitterCreator: this.ef.element(By.xpath('//meta[@name="twitter:creator"]')),
            twitterImage: this.ef.element(By.xpath('//meta[@name="twitter:image:src"]')),
        });
    }

    return AdpTwitterMetaModel;
})(Element);
