const {
	getOfficers,
	createOfficer,
	updateOfficerById,
	deleteOfficerById,
} = require("./controller");

const router = require("express").Router();

router.get("/", getOfficers);
router.post("/", createOfficer);
router.put("/:id", updateOfficerById);
router.delete("/:id", deleteOfficerById);

module.exports = router;
