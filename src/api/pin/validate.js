const Joi = require("joi");

const pinSchema = Joi.object({
	type: Joi.string().valid("Temporary", "Permanent"),
	firstName: Joi.string(),
	lastName: Joi.string(),
	description: Joi.string(),
	notes: Joi.string(),
	longitude: Joi.number(),
	latitude: Joi.number(),
	gpsCoordinates: Joi.string(),
	verticalAngle: Joi.number(),
	link: Joi.string(),
});

const validatePin = (body) => {
	const { error } = pinSchema.validate(body);
	return { error };
};

module.exports = validatePin;
