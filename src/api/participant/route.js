const {
	getParticipants,
	createParticipant,
	updateParticipantById,
	deleteParticipantById,
} = require("./controller");

const router = require("express").Router();

router.get("/", getParticipants);
router.post("/", createParticipant);
router.put("/:id", updateParticipantById);
router.delete("/:id", deleteParticipantById);

module.exports = router;
