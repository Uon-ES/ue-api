const { sendMessage } = require("./controller");

const router = require("express").Router();

router.post("/", sendMessage);

module.exports = router;
