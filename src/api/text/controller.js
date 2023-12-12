const { sendTextMessage } = require("./useCases");

const sendMessage = async (req, res) => {
	try {
		const { to, body } = req.body;
		if (!to || !body) {
			return res.status(400).json("Error: body and to are required.");
		}
		const response = await sendTextMessage(to, body);
		res.json(response);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	sendMessage,
};
