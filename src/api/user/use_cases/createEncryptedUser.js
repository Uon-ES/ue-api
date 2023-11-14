const encryptPassword = require("./encryptPassword");

const createEncryptedUser = async (body, repo) => {
	try {
		const { password } = body;
		const hashedPassword = await encryptPassword(password);
		const userData = {
			...body,
			password: hashedPassword,
		};
		const user = await repo.create(userData);
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = createEncryptedUser;
