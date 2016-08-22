'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(AdpGoogleMetaModel, BasePageModel);

    function AdpGoogleMetaModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/123';

        this.ui = _.extend({}, {
            googleName: this.ef.element(By.xpath('//meta[@itemprop="name"]')),
            googleDescription: this.ef.element(By.xpath('//meta[@itemprop="description"]')),
            googleImage: this.ef.element(By.xpath('//meta[@itemprop="image"]')),
        });
    }

    return AdpGoogleMetaModel;
})(Element);
