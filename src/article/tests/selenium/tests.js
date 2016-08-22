var chai = require('chai'),
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
    ArticleDetailsPage = require('./ArticleDetailsPage.js'),
    AdpGoogleMeta = require('./AdpGoogleMeta.js'),
    AdpTwitterMeta = require('./AdpTwitterMeta.js'),
    AdpFacebookMeta = require('./AdpFacebookMeta.js'),
    AdpMeta = require('./AdpMeta.js');


describe("New Article Form", function() {

    var driver,pageNavigator,articleFormPage, articleListPage;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        articleFormPage = new ArticleFormPage(driver);

        mongodb.connect(function(err,mongoHandler) {

            if(err) {
                console.log('Could not connect to mongodb %s',err);
                process.exit();
            }

            articleModel = mongodb.getModel('article','articles');

        });


    });

    it("should display the form", function(done) {

        pageNavigator.visit(articleFormPage.url)
        .then(function () {
            articleFormPage.isRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });


    it("should submit the form", function(done) {

        pageNavigator.visit(articleFormPage.url).then(function () {
            articleFormPage.submit('the title', 'the article body longer than 50 characters blah blah blah blah').then(function (ok) {
                articleListPage = new ArticleListPage(driver);
                pageNavigator.visit('http://google.com')
                .then(function () {
                    pageNavigator.visit(articleListPage.url)
                    .then(function () {
                         articleListPage.isRendered('the title',function(ok) {
                             expect(ok).to.be.ok;
                        });
                    });
                });
            });
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });



    after(function(done) {
        driver.quit().then(done);
    });
});


describe("Article list", function() {

    var driver,pageNavigator,articleListPage;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        articleListPage = new ArticleListPage(driver);
    });

    it("should display at least 1 article excerpt", function(done) {

        pageNavigator.visit(articleListPage.url)
        .then(function () {
            articleListPage.isRendered(function(ok) {
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
        articleModel.removeOneBySlug('the-title',function(err,res) {
            if(err) {
                console.log('Could not delete test article: %s',err);
                process.exit();
            }
            mongodb.connection.close();
        });
    });
});

describe("ADP Meta", function() {

    var driver,pageNavigator,adpMeta;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        adpMeta = new AdpMeta(driver);
    });

    it("should display the title tag", function(done) {

        pageNavigator.visit(adpMeta.url)
        .then(function () {
            adpMeta.isTitleTagRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the meta description", function(done) {

        pageNavigator.visit(adpMeta.url)
        .then(function () {
            adpMeta.isMetaDescriptionRendered(function(ok) {
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
});

describe("ADP Google+ Meta", function() {

    var driver,pageNavigator,adpGoogleMeta;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        adpGoogleMeta = new AdpGoogleMeta(driver);
    });

    it("should display the google+ name", function(done) {

        pageNavigator.visit(adpGoogleMeta.url)
        .then(function () {
            adpGoogleMeta.isGoogleNameRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the google+ description", function(done) {

        pageNavigator.visit(adpGoogleMeta.url)
        .then(function () {
            adpGoogleMeta.isGoogleDescriptionRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the google+ image", function(done) {

        pageNavigator.visit(adpGoogleMeta.url)
        .then(function () {
            adpGoogleMeta.isGoogleImageRendered(function(ok) {
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
});

describe("ADP Twitter Meta", function() {

    var driver,pageNavigator,adpTwitterMeta;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        adpTwitterMeta = new AdpTwitterMeta(driver);
    });

    it("should display the Twitter Card", function(done) {

        pageNavigator.visit(adpTwitterMeta.url)
        .then(function () {
            adpTwitterMeta.isTwitterCardRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Twitter Site", function(done) {

        pageNavigator.visit(adpTwitterMeta.url)
        .then(function () {
            adpTwitterMeta.isTwitterSiteRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Twitter Title", function(done) {

        pageNavigator.visit(adpTwitterMeta.url)
        .then(function () {
            adpTwitterMeta.isTwitterTitleRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Twitter Description", function(done) {

        pageNavigator.visit(adpTwitterMeta.url)
        .then(function () {
            adpTwitterMeta.isTwitterDescriptionRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Twitter Creator", function(done) {

        pageNavigator.visit(adpTwitterMeta.url)
        .then(function () {
            adpTwitterMeta.isTwitterCreatorRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Twitter Image", function(done) {

        pageNavigator.visit(adpTwitterMeta.url)
        .then(function () {
            adpTwitterMeta.isTwitterImageRendered(function(ok) {
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
});

describe("ADP Facebook Meta", function() {

    var driver,pageNavigator,adpFacebookMeta;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        adpFacebookMeta = new AdpFacebookMeta(driver);
    });

    it("should display the Facebook Title", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookTitleRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Type", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookTypeRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Url", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookUrlRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Image", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookImageRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Description", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookDescriptionRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Site Name", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookSiteNameRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Published Time", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookPublishedTimeRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Modified Time", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookModifiedTimeRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Section", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookSectionRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Tag", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookTagRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    it("should display the Facebook Admins", function(done) {

        pageNavigator.visit(adpFacebookMeta.url)
        .then(function () {
            adpFacebookMeta.isFacebookAdminsRendered(function(ok) {
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
});

describe("Article details", function() {

    var driver,pageNavigator,articleDetailsPage;

    before(function() {
        driver = new SeleniumTest().getDriver();
        pageNavigator = new PageNavigator({ driver: driver });
        articleDetailsPage = new ArticleDetailsPage(driver);
    });

    it("should display the details page", function(done) {

        pageNavigator.visit(articleDetailsPage.url)
        .then(function () {
            articleDetailsPage.isRendered(function(ok) {
                 expect(ok).to.be.ok;
            })
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
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
});
