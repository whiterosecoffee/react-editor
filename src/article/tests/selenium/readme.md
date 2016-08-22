# Selenium Tests

Our Selenium Tests check UI components and their functionality.

## Creating a Selenium Test

To create a selenium test you need to edit or create three files:
- tests.js
- whatYouAreTesting.js
- whatYouAreTestingModel.js

### Tests.js

Tests.js is where all of the tests are listed. For this project if you need to create a new test.js file you must require the following at the top of your file:

`var chai = require('chai'),
    sinon = require( 'sinon' ),
    sinonChai = require( 'sinon-chai' ),
    expect = chai.expect,
    util = require('util'),
    PageNavigator = require('selenium-pageobject').PageNavigator,
    SeleniumTest = require('../../../lib/BaseSeleniumTest'),
    ArticleFormPage = require('./ArticleFormPage.js'),
    ArticleListPage = require('./ArticleListPage.js'),
    mongodb = require( '../../../lib/mongo-connect' )(true),
    articleModel = null,
    ArticleDetailsPage = require('./ArticleDetailsPage.js');`

Then you must create your specific test instance. We are currently grouping tests by components or by render output.
Below is an example of an existing test:

`describe("Article details", function() {

    var driver,pageNavigator,articleDetailsPage;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        articleDetailsPage = new ArticleDetailsPage(driver);
    });

    it("should display the article banner image", function(done) {

        pageNavigator.visit(articleDetailsPage.url)
        .then(function () {
            articleDetailsPage.isArticleBannerRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});`

This test is on the Article Detail Pages, `describe("Article Details")`. Then it calls the Selenium drivers and tells Selenium where to look. Then the test function is written in readable English, `it("should display the artilce banner image")`, followed by calling the page to visit and then the testing function, `isArticleBannerRendered`.

### whatYouAreTesting.js

whatYouAreTesting.js (i.e. ArticleDetailsPage.js) lists all the tests created for that particular module or component. If you have to create a new file add the following to the top of your file:

`'use strict';

var By = require('selenium-webdriver').By,
    ArticleDetailsPageModel = require('./ArticleDetailsPageModel.js'),
    util = require('util'),
    BasePage = require('../../../lib/BasePage.js');`

Be sure to replace the model variable and the required file at the top with your new variable and filename. `ArticleDetailsPageModel = require('./ArticleDetailsPageModel.js')`

The next block of code initializes the test function.

`function ArticleDetailsPage(driver) {
    this.init(new ArticleDetailsPageModel(driver, By.tagName('html')));
}

util.inherits(ArticleDetailsPage,BasePage);`

Then you create your test below. Copy the example below and be sure to change the driver variable and the function name.

`ArticleDetailsPage.prototype.isArticleBannerRendered = function (callback) {
   this.ui.articleBanner.isElementPresent().then(function(ok){
        callback(ok);
   })
};

module.exports = ArticleDetailsPage;`

### whatYouAreTestingModel.js

whatYouAreTestingModel.js (i.e. ArticleDetailsPageModel.js) lists what you are actually checking for in your test. If you have to create a new page paste the following at the top:

    'use strict';

    var By = require('selenium-webdriver').By,
        po = require('selenium-pageobject'),
        _ = require('lodash'),
        util = require('util'),
        BasePageModel = require('../../../lib/BasePageModel'),
        extend = po.extend,
        Element = po.elements.Element;

    module.exports = (function (_super) {
        extend(ArticleDetailsPageModel, BasePageModel);

Be sure to change the model listed on the bottom line, ArticleDetailsPageModel in this example. Then you specify the target of your test.

    function ArticleDetailsPageModel() {
            _super.apply(this, arguments);

        this.ui = _.extend({}, {
            articleBanner: this.ef.element(By.id('articleBanner')),
        });
    }

        return ArticleDetailsPageModel;
    })(Element);

In this example we're confirming that the element with the id of articleBanner has been rendered.
* If you ever need to change the target of your test you only have to change the id on the model.js file.

### Targeting Elements

The main ways to target elements using Selenium tests are:

-  `(By.id('yourTarget'))`
-  `(By.css('yourCssSelector'))`
-  `(By.className('yourTarget'))`

More usage examples can be found [here](http://selenium.googlecode.com/git/docs/api/javascript/namespace_webdriver_By.html).

### Testing

With your node server already running, open a new command line prompt and type:

-  `gulp selenium-test`

You should see your tests running and which tests pass and fail.
