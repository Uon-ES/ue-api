const { hash } = require("bcrypt");

const encryptPassword = async (password) => {
	return hash(password, 10);
};

module.exports = encryptPassword;
