const { Schema, model } = require("mongoose");

const userSchema = Schema(
	{
		email: {
			type: String,
		},
		password: {
			type: String,
			default: "",
		},
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
		phoneNumber: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["Assigned", "Unassigned"],
			default: "Unassigned",
		},
		officerStatus: {
			type: String,
			enum: ["", "Steady", "Down"],
			default: "Steady",
		},
		description: {
			type: String,
			default: "",
		},
		notes: {
			type: String,
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
		refreshToken: {
			type: String,
			default: "",
		},
		resetToken: {
			type: String,
			default: "",
		},
		resetTokenExpiry: {
			type: Date,
			default: () => new Date(),
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
