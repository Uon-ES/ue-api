const Joi = require("joi");

const participantSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string(),
	phoneNumber: Joi.string(),
	description: Joi.string(),
	notes: Joi.string(),
	deviceType: Joi.string(),
	pin: Joi.string(),
});

const validateParticipant = (body) => {
	const { error } = participantSchema.validate(body);
	return { error: error?.details[0]?.message || null };
};

module.exports = {
	validateParticipant,
};
