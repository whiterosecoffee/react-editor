'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(AdpFacebookMetaModel, BasePageModel);

    function AdpFacebookMetaModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/123';

        this.ui = _.extend({}, {
            facebookTitle: this.ef.element(By.xpath('//meta[@property="og:title"]')),
            facebookType: this.ef.element(By.xpath('//meta[@property="og:type"]')),
            facebookUrl: this.ef.element(By.xpath('//meta[@property="og:url"]')),
            facebookImage: this.ef.element(By.xpath('//meta[@property="og:image"]')),
            facebookDescription: this.ef.element(By.xpath('//meta[@property="og:description"]')),
            facebookSiteName: this.ef.element(By.xpath('//meta[@property="article:site_name"]')),
            facebookPublishedTime: this.ef.element(By.xpath('//meta[@property="article:published_time"]')),
            facebookModifiedTime: this.ef.element(By.xpath('//meta[@property="article:modified_time"]')),
            facebookTag: this.ef.element(By.xpath('//meta[@property="article:section"]')),
            facebookAdmins: this.ef.element(By.xpath('//meta[@property="fb:admins"]')),
        });
    }

    return AdpFacebookMetaModel;
})(Element);
