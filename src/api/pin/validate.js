const Joi = require("joi");

const pinSchema = Joi.object({
	longitude: Joi.string().required(),
	latitude: Joi.string().required(),
	gpsCoordinates: Joi.string().optional(),
	verticalAngle: Joi.number().optional(),
	link: Joi.string().optional(),
});

const validatePin = (body) => {
	const { error } = pinSchema.validate(body);
	return { error };
};

module.exports = validatePin;
