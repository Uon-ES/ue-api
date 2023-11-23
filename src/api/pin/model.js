const { Schema, model } = require("mongoose");

const pinSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["Temporary", "Permanent"],
			default: "Permanent",
		},
		longitude: {
			type: Number,
		},
		latitude: {
			type: Number,
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
