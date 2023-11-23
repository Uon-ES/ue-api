const Joi = require("joi");

const userSchema = Joi.object({
	email: Joi.string(),
	password: Joi.string(),
	type: Joi.string().valid("admin", "participant", "officer"),
	firstName: Joi.string(),
	lastName: Joi.string(),
	phoneNumber: Joi.string(),
	status: Joi.string().valid("", "Assigned", "Unassigned"),
	description: Joi.string(),
	notes: Joi.string(),
	deviceType: Joi.string(),
	pinsToView: Joi.number(),
	pin: Joi.string().optional(),
});

const validateUser = (body) => {
	const { error } = userSchema.validate(body);
	return { error };
};

const temporaryPinSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	description: Joi.string().required(),
	notes: Joi.string().required(),
});

const validateTemporaryPin = (body) => {
	const { error } = temporaryPinSchema.validate(body);
	return { error };
};

module.exports = { validateUser, validateTemporaryPin };
