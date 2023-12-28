const {
	getParticipants,
	createParticipant,
	updateParticipantById,
	deleteParticipantById,
	handleDeeplink,
} = require("./controller");

const router = require("express").Router();

router.get("/", getParticipants);
router.post("/", createParticipant);
router.post("/link", handleDeeplink);
router.put("/:id", updateParticipantById);
router.delete("/:id", deleteParticipantById);

module.exports = router;
