const {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
	createTemporaryPin,
} = require("./controller");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/temporary-pin", createTemporaryPin);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
