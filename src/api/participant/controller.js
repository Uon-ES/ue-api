const { sign } = require("jsonwebtoken");
const participantRepo = require("./repository");
const { validateParticipant } = require("./validate");

const createParticipant = async (req, res) => {
	try {
		const { error } = validateParticipant(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { email } = req.body;
		if (email) {
			const participantExists = await participantRepo.findByEmail(email);
			if (participantExists) {
				return res.status(400).json("Email already in use.");
			}
		}

		const participant = await participantRepo.create(req.body);
		res.json(participant);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getParticipants = async (req, res) => {
	try {
		const participants = await participantRepo.findAll(req.query);
		res.json(participants);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateParticipantById = async (req, res) => {
	try {
		const { error } = validateParticipant(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { id } = req.params;
		const participant = await participantRepo.findById(id);
		if (!participant) {
			return res.status(404).json("Participant not found.");
		}

		const updatedParticipant = await participantRepo.updateById(
			id,
			req.body
		);
		res.json(updatedParticipant);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteParticipantById = async (req, res) => {
	try {
		const { id } = req.params;
		const participant = await participantRepo.findById(id);
		if (!participant) {
			return res.status(404).json("Participant not found.");
		}

		await participantRepo.remove(id);
		res.json(id);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const handleDeeplink = async (req, res) => {
	try {
		const { id } = req.body;

		const participant = await participantRepo.findById(id);
		if (!participant) {
			return res.status(404).json("Participant not found.");
		}

		const token = sign(
			{ email: participant.email },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1h",
			}
		);

		res.json(`/login?token=${token}`);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createParticipant,
	getParticipants,
	updateParticipantById,
	deleteParticipantById,
	handleDeeplink,
};
