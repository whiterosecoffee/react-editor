var Joi = require('express-validation/node_modules/joi');

// Basic validation rules, to be shared by client side and server side code. Does not contain middleware configuration, because the client doesn't care about that.
var validators = module.exports = {
	newImage: {
		width: Joi.number().min(795),
		height: Joi.number().min(395),
		format:  Joi.any().valid(['jpeg', 'jpg', 'png']),
		filesize: Joi.any()
	},
	newImageMIME: {
		mime: Joi.any().valid(['image/jpeg', 'image/jpg', 'image/png'])
	}
}
