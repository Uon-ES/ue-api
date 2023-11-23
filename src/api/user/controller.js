const GenericRepository = require("../../repository");
const { Pin } = require("../pin/model");
const { User } = require("./model");
const createEncryptedUser = require("./use_cases/createEncryptedUser");
const { validateUser, validateTemporaryPin } = require("./validate");

const repo = new GenericRepository(User);
const pinRepo = new GenericRepository(Pin);

const createUser = async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json(error.details[0].message);
		}

		const { email, password } = req.body;
		const userExists = await repo.findByEmail(email);
		if (userExists) {
			return res.status(400).json("User already exists.");
		}

		let user;
		if (password) {
			user = await createEncryptedUser(req.body, repo);
		} else {
			user = await repo.create(req.body);
		}
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const createTemporaryPin = async (req, res) => {
	try {
		const { error } = validateTemporaryPin(req.body);
		if (error) {
			return res.status(400).json(error.details[0].message);
		}

		const { firstName, lastName, description, notes } = req.body;

		const user = new User({ firstName, lastName, description, notes });
		await user.save();

		const pin = new Pin();
		pin.type = "Temporary";
		await pin.save();

		user.pin = pin._id;

		const newUser = await user.save();
		res.json(newUser);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUsers = async (req, res) => {
	try {
		const query = req.query;
		const users = await repo.findAll(query);
		res.json(users);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await repo.findById(id);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		res.json(user);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await repo.findById(id);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		const updatedUser = await repo.updateById(id, req.body);
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await repo.findById(id);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		if (user.pin) {
			await pinRepo.remove(user.pin);
		}

		await repo.remove(id);
		res.json(id);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createUser,
	createTemporaryPin,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};
