const { Schema, model } = require("mongoose");

const pinSchema = new Schema(
	{
		longitude: {
			type: String,
			required: true,
		},
		latitude: {
			type: String,
			required: true,
		},
		gpsCoordinates: {
			type: String,
			default: "",
		},
		verticalAngle: {
			type: Number,
			default: 0,
		},
		link: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const Pin = model("Pin", pinSchema);

module.exports = {
	pinSchema,
	Pin,
};
