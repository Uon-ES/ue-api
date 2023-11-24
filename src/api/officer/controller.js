const pinRepo = require("../pin/repository");
const officerRepo = require("./repository");
const { validateOfficer } = require("./validate");

const createOfficer = async (req, res) => {
	try {
		const { error } = validateOfficer(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { email } = req.body;
		if (email) {
			const officerExists = await officerRepo.findByEmail(email);
			if (officerExists) {
				return res.status(400).json("Email already in use.");
			}
		}

		const officer = await officerRepo.create(req.body);
		res.json(officer);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getOfficers = async (req, res) => {
	try {
		const officers = await officerRepo.findAll(req.query);
		res.json(officers);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateOfficerById = async (req, res) => {
	try {
		const { error } = validateOfficer(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { id } = req.params;
		const officer = await officerRepo.findById(id);
		if (!officer) {
			return res.status(404).json("Officer not found.");
		}

		const updatedOfficer = await officerRepo.updateById(id, req.body);
		res.json(updatedOfficer);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteOfficerById = async (req, res) => {
	try {
		const { id } = req.params;
		const officer = await officerRepo.findById(id);
		if (!officer) {
			return res.status(404).json("Officer not found.");
		}

		if (officer?.pin) {
			await pinRepo.remove(officer.pin);
		}

		await officerRepo.remove(id);
		res.json(id);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createOfficer,
	getOfficers,
	updateOfficerById,
	deleteOfficerById,
};
