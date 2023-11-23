const Joi = require("joi");

const pinSchema = Joi.object({
	type: Joi.string().valid("Temporary", "Permanent"),
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
