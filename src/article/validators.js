var Joi = require('express-validation/node_modules/joi');

// Basic validation rules, to be shared by client side and server side code. Does not contain middleware configuration, because the client doesn't care about that.
var validators = module.exports = {
	newArticle: {
		title: Joi.string().trim().min(1).max(100).required(),
		body: Joi.string().trim().required(),
		headerVia: Joi.string().min(3).regex(/^[^\.]+[\.]+[^\.]+/),
		credit: Joi.string().trim().min(2).max(30)
	}
}
