'use strict';

var wd = require('selenium-webdriver');

function BaseSeleniumTest(type,timeout) {

	this.timeout = parseInt(timeout,10) || 8000;
	this.type = type || 'phantomjs';
	this.isValid(this.type);
	this.driver = this.getDriver(this.type);
	this.driver.manage().timeouts().pageLoadTimeout(this.timeout);
}; 


BaseSeleniumTest.prototype.isValid = function(type) {
	if(!wd.Capabilities[type]) {
		throw new Error('Invalid type!')
	}
};

BaseSeleniumTest.prototype.getDriver = function(type) {

	if(!type) {
		return this.driver;
	} else {
		this.isValid(type);
		return new wd.Builder().withCapabilities(wd.Capabilities[type]()).build();
	}
};



module.exports = BaseSeleniumTest;