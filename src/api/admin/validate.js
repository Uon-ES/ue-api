const Joi = require("joi");

const adminSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string(),
	password: Joi.string(),
	phoneNumber: Joi.string(),
});

const validateAdmin = (body) => {
	const { error } = adminSchema.validate(body);
	return { error: error?.details[0]?.message || null };
};

module.exports = {
	validateAdmin,
};
