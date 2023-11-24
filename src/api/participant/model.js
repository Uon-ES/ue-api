const { Schema, model } = require("mongoose");

const participantSchema = Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		phoneNumber: String,
		description: String,
		notes: String,
		deviceType: String,
		pin: {
			type: Schema.Types.ObjectId,
			ref: "Pin",
		},
	},
	{
		timestamps: true,
	}
);

const Participant = model("Participant", participantSchema);

module.exports = {
	participantSchema,
	Participant,
};
