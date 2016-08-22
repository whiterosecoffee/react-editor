var chai = require('chai'),
    sinon = require( 'sinon' ),
    sinonChai = require( 'sinon-chai' ),
    expect = chai.expect,
    util = require('util'),
    PageNavigator = require('selenium-pageobject').PageNavigator,
    SeleniumTest = require('../../../lib/BaseSeleniumTest'),
    mongodb = require( '../../../lib/mongo-connect' )(true),
    articleModel = null,
    HomePage = require('./HomePage.js');

describe("Home Page", function() {

    var driver,pageNavigator,homePage;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        homePage = new HomePage(driver);
    });

    it("should display one image inside each tile", function(done) {

        pageNavigator.visit(homePage.url)
        .then(function () {
            homePage.isRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

});
