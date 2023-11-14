const { compare } = require("bcrypt");

const comparePasswords = async (target, password) => {
	return compare(target, password);
};

module.exports = comparePasswords;
