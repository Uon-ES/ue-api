const adminRepo = require("./repository");
const { validateAdmin } = require("./validate");

const createAdmin = async (req, res) => {
	try {
		const { error } = validateAdmin(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { email } = req.body;
		if (email) {
			const userExists = await adminRepo.findByEmail(email);
			if (userExists) {
				return res.status(400).json("User already exists.");
			}
		}

		const admin = await adminRepo.create(req.body);
		res.json(admin);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getAdmins = async (req, res) => {
	try {
		const admins = await adminRepo.findAll(req.query);
		res.json(admins);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateAdminById = async (req, res) => {
	try {
		const { error } = validateAdmin(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { id } = req.params;
		const admin = await adminRepo.findById(id);
		if (!admin) {
			return res.status(404).json("Admin not found.");
		}

		const updatedAdmin = await adminRepo.updateById(id, req.body);
		res.json(updatedAdmin);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteAdminById = async (req, res) => {
	try {
		const { id } = req.params;
		const admin = await adminRepo.findById(id);
		if (!admin) {
			return res.status(404).json("Admin not found.");
		}

		await adminRepo.remove(id);
		res.json(id);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createAdmin,
	getAdmins,
	updateAdminById,
	deleteAdminById,
};
