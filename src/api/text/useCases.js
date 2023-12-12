const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

const sendTextMessage = async (to, body) => {
	try {
		const message = await twilioClient.messages.create({
			body,
			to,
			from: "your_twilio_phone_number",
		});
		return message;
	} catch (err) {
		throw new Error(err.message);
	}
};

module.exports = {
	sendTextMessage,
};
