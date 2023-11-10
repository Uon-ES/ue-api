const { Schema, model } = require("mongoose");

const userSchema = Schema(
	{
		type: {
			type: String,
			enum: ["admin", "participant", "officer"],
			default: "participant",
		},
		firstName: {
			type: String,
			default: "",
		},
		lastName: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			default: "",
		},
		phoneNumber: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["", "Enabled", "Disabled"],
			default: "",
		},
		deviceType: {
			type: String,
			default: "",
		},
		pinsToView: {
			type: Number,
			default: 0,
		},
		pin: {
			type: Schema.Types.ObjectId,
			ref: "Pin",
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = {
	userSchema,
	User,
};
