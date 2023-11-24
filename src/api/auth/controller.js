const GenericRepository = require("../../repository");
const { User } = require("../user/model");
const comparePasswords = require("./use_cases/comparePasswords");
const jwtSign = require("./use_cases/jwtSign");
const jwtVerify = require("./use_cases/jwtVerify");
const validateAuth = require("./validate");
const verify = require("./use_cases/verify");
const adminRepo = require("../admin/repository");
const encryptPassword = require("./use_cases/encryptPassword");

const cookieObject = {
	httpOnly: true,
	sameSite: "None",
	secure: true,
	maxAge: 15 * 24 * 60 * 60 * 1000,
};

const createAdminPassword = async (req, res) => {
	try {
		const { error } = validateAuth(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { email, password } = req.body;

		const admin = await adminRepo.findByEmail(email);
		if (!admin) {
			return res.status(400).json("User not found.");
		}

		const { _id: id } = admin;
		const hashedPassword = await encryptPassword(password);
		await adminRepo.updateById(id, { password: hashedPassword });
		res.json(id);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const handleLogin = async (req, res) => {
	try {
		const { error } = validateAuth(req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { email, password } = req.body;
		const user = await adminRepo.findByEmail(email);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		const match = await comparePasswords(password, user.password);
		if (!match) {
			return res.status(400).json("Unable to login.");
		}

		const userWithoutPassword = {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			phoneNumber: user.phoneNumber,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		const accessTokenCreds = {
			payload: {
				user: userWithoutPassword,
			},
			secret: process.env.ACCESS_TOKEN_SECRET,
			options: { expiresIn: "15d" },
		};
		const refreshTokenCreds = {
			payload: {
				user: userWithoutPassword,
			},
			secret: process.env.REFRESH_TOKEN_SECRET,
			options: { expiresIn: "15d" },
		};

		const accessToken = jwtSign(accessTokenCreds);
		const refreshToken = jwtSign(refreshTokenCreds);

		await adminRepo.updateById(user._id, {
			refreshToken,
		});

		res.cookie("jwt", refreshToken, cookieObject);
		res.json({
			accessToken,
			...userWithoutPassword,
		});
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const handleRefreshToken = async (req, res) => {
	try {
		const cookies = req.cookies;
		if (!cookies.jwt) {
			return res.status(404).json("Not found.");
		}
		const refreshToken = cookies.jwt;

		const user = await adminRepo.findByRefreshToken(refreshToken);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		const { userNotFound, accessToken } = jwtVerify(refreshToken, user);
		if (userNotFound) {
			return res.status(404).json("User not found.");
		}

		const userWithoutPassword = {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			accessToken,
		};

		res.json(userWithoutPassword);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const handleLogout = async (req, res) => {
	try {
		const cookies = req.cookies;
		if (!cookies.jwt) {
			return res.sendStatus(204);
		}
		const refreshToken = cookies.jwt;

		const user = await adminRepo.findByRefreshToken(refreshToken);
		if (!user) {
			res.clearCookie("jwt", cookieObject);
			return res.sendStatus(204);
		}

		await adminRepo.updateById(user._id, { refreshToken: "" });

		res.clearCookie("jwt", cookieObject);
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const handleResetRequest = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json(`"email" is required.`);
		}

		const user = await adminRepo.findByEmail(email);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		const resetToken = jwtSign({
			payload: { email },
			secret: process.env.JWT_SECRET,
			options: { expiresIn: "24h" },
		});

		user.resetToken = resetToken;
		user.resetTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
		await user.save();

		const resetLink = `set-password?token=${resetToken}`;
		res.json(resetLink);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const handleResetPassword = async (req, res) => {
	try {
		const { token, newPassword } = req.body;
		if (!token || !newPassword) {
			return res
				.status(400)
				.json(`"token" and "newPassword" are required.`);
		}

		const { email, exp } = verify({
			token,
			secret: process.env.JWT_SECRET,
		});
		if (new Date() > new Date(exp * 1000)) {
			return res.status(400).json("Token has expired.");
		}

		const user = await adminRepo.findByEmail(email);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		const hashedPassword = await encryptPassword(newPassword);
		const match = await comparePasswords(newPassword, user.password);
		if (match) {
			return res
				.status(400)
				.json("New password cannot equal previous password.");
		}

		user.password = hashedPassword;
		user.resetToken = null;
		user.resetTokenExpiry = null;
		await user.save();

		res.sendStatus(204);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createAdminPassword,
	handleLogin,
	handleRefreshToken,
	handleLogout,
	handleResetRequest,
	handleResetPassword,
};
