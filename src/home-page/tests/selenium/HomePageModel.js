'use sctrict';

var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'),
    _ = require('lodash'),
    util = require('util'),
    BasePageModel = require('../../../lib/BasePageModel'),
    extend = po.extend,
    Element = po.elements.Element;

module.exports = (function (_super) {
    extend(HomePageModel, BasePageModel);

    function HomePageModel() {
        _super.apply(this, arguments);

        this.url = 'http://localhost:3000/#/';

        this.ui = _.extend({}, {
            tileImage: this.ef.element(By.css('.articleTile img')),
        });
    }

    return HomePageModel;
})(Element);
