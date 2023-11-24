const {
	handleRefreshToken,
	handleLogout,
	handleLogin,
	handleResetRequest,
	handleResetPassword,
	createAdminPassword,
} = require("./controller");

const router = require("express").Router();

router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);
router.post("/create-password", createAdminPassword);
router.post("/login", handleLogin);
router.post("/request-reset", handleResetRequest);
router.post("/reset", handleResetPassword);

module.exports = router;
