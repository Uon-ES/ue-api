const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendTextMessage = async (to, body) => {
	try {
		const twilioClient = twilio(accountSid, authToken);
		const message = await twilioClient.messages.create({
			to,
			from: "9513354351",
			body,
		});
		return message;
	} catch (err) {
		throw new Error(err.message);
	}
};

module.exports = {
	sendTextMessage,
};
