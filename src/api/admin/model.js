const { Schema, model } = require("mongoose");

const adminSchema = Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		phoneNumber: String,
		refreshToken: String,
		resetToken: String,
		status: {
			type: String,
			enum: ["Enabled", "Disabled"],
			default: "Enabled",
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

const Admin = model("Admin", adminSchema);

module.exports = {
	adminSchema,
	Admin,
};
