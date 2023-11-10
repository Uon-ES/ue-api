const Joi = require("joi");

const userSchema = Joi.object({
	type: Joi.string().valid("admin", "participant", "officer"),
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	email: Joi.string().optional(),
	phoneNumber: Joi.string().optional(),
	status: Joi.string().valid("", "Enabled", "Disabled"),
	deviceType: Joi.string().optional(),
	pinsToView: Joi.number().optional(),
	pin: Joi.string().optional(),
});

const validateUser = (body) => {
	const { error } = userSchema.validate(body);
	return { error };
};

module.exports = validateUser;
