const Joi = require("joi");

const pinSchema = Joi.object({
	longitude: Joi.number(),
	latitude: Joi.number(),
	gpsCoordinates: Joi.string(),
	verticalAngle: Joi.number(),
	link: Joi.string(),
	type: Joi.string().valid("Temporary", "Permanent"),
	user: Joi.string(),
});

const validatePin = (body) => {
	const { error } = pinSchema.validate(body);
	return { error };
};

module.exports = validatePin;
