const Joi = require("joi");

const validationSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
}).required();

const validateAuth = (body) => {
	const { error } = validationSchema.validate(body);
	return {
		error: error?.details[0]?.message,
	};
};

module.exports = validateAuth;
