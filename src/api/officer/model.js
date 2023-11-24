const { Schema, model } = require("mongoose");

const officerSchema = Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		phoneNumber: String,
		deviceType: String,
		status: {
			type: String,
			enum: ["Steady", "Down"],
			default: "Steady",
		},
		pinsToView: [
			{
				type: Schema.Types.ObjectId,
				ref: "Pin",
			},
		],
		pin: {
			type: Schema.Types.ObjectId,
			ref: "Pin",
		},
	},
	{
		timestamps: true,
	}
);

const Officer = model("Officer", officerSchema);

module.exports = {
	officerSchema,
	Officer,
};
