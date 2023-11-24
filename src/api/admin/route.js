const {
	getAdmins,
	createAdmin,
	updateAdminById,
	deleteAdminById,
} = require("./controller");

const router = require("express").Router();

router.get("/", getAdmins);
router.post("/", createAdmin);
router.put("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);

module.exports = router;
