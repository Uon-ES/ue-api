const {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
	createTemporaryPin,
	getTemporaryPins,
} = require("./controller");

const router = require("express").Router();

router.get("/pins", getTemporaryPins);
router.get("/", getUsers);
router.get("/id/:id", getUserById);
router.post("/", createUser);
router.post("/temporary-pins", createTemporaryPin);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
