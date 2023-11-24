const { Schema, model } = require("mongoose");

const pinSchema = new Schema(
	{
		longitude: Number,
		latitude: Number,
		gpsCoordinates: String,
		verticalAngle: Number,
		link: String,
		type: {
			type: String,
			enum: ["Temporary", "Permanent"],
			default: "Permanent",
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
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
