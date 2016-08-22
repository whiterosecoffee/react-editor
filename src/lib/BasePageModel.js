'use strict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'), 
    extend = po.extend, 
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(BasePageModel, _super);

    function BasePageModel() {
        _super.apply(this, arguments);
    }

    return BasePageModel;
})(Element);

module.exports.prototype.findByName = function(name) {
    return this.ef.element(By.tagName(name));
};

module.exports.prototype.findByLinkText = function(text) {
    return this.ef.element(By.linkText(text));
};

module.exports.prototype.findByXPath= function(xpath) {
    return this.ef.element(By.xpath(xpath));
};