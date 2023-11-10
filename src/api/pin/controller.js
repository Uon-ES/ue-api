const GenericRepository = require("../../repository");
const { Pin } = require("./model");
const validatePin = require("./validate");

const repo = new GenericRepository(Pin);

const createPin = async (req, res) => {
	try {
		const { error } = validatePin(req.body);
		if (error) {
			return res.status(400).send(error.details[0].message);
		}

		const pin = await repo.create(req.body);
		res.status(201).json(pin);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getPins = async (req, res) => {
	try {
		const query = req.query;
		const pins = await repo.findAll(query);
		res.json(pins);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getPinById = async (req, res) => {
	try {
		const { id } = req.params;

		const pin = await repo.findById(id);
		if (!pin) {
			return res.status(404).send("Pin not found.");
		}

		res.json(pin);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const updatePinById = async (req, res) => {
	try {
		const { id } = req.params;

		const pin = await repo.findById(id);
		if (!pin) {
			return res.status(404).send("Pin not found.");
		}

		const updatedPin = await repo.updateById(id, req.body);
		res.json(updatedPin);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const deletePinById = async (req, res) => {
	try {
		const { id } = req.params;

		const pin = await repo.findById(id);
		if (!pin) {
			return res.status(404).send("Pin not found.");
		}

		await repo.remove(id);
		res.json(id);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = {
	createPin,
	getPins,
	getPinById,
	updatePinById,
	deletePinById,
};
