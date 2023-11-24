const Joi = require("joi");

const officerSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string(),
	phoneNumber: Joi.string(),
	deviceType: Joi.string(),
	status: Joi.string().valid("Steady", "Down"),
	pinsToView: Joi.array().items(Joi.string()),
	pin: Joi.string(),
});

const validateOfficer = (body) => {
	const { error } = officerSchema.validate(body);
	return { error: error?.details[0]?.message || null };
};

module.exports = {
	validateOfficer,
};
