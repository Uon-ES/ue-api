const { Schema, model } = require("mongoose");

const adminSchema = Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		phoneNumber: String,
		deviceType: String,
		refreshToken: String,
		resetToken: String,
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
