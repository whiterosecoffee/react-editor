var Joi = require('express-validation/node_modules/joi');

// Basic validation rules, to be shared by client side and server side code. Does not contain middleware configuration, because the client doesn't care about that.
var validators = module.exports = {
	imageAttributes: {
		via: Joi.optional().string().example('http://'),
		credit: Joi.optional().string().trim().min(2).max(30)
	}
}
