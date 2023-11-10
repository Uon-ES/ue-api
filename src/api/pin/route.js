const {
	getPins,
	createPin,
	getPinById,
	updatePinById,
	deletePinById,
} = require("./controller");

const router = require("express").Router();

router.get("/", getPins);
router.get("/:id", getPinById);
router.post("/", createPin);
router.put("/:id", updatePinById);
router.delete("/:id", deletePinById);

module.exports = router;
