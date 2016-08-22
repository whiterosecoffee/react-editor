'use strict';

function BasePage() {

}


BasePage.prototype.init = function init(model) {
	this.model = model;
    this.ui = model.ui;
    this.url = model.url;
};


BasePage.prototype.isRendered = function isRendered(model) { };

module.exports = BasePage;