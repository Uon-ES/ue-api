const jwt = require("jsonwebtoken");

const verify = ({ token, secret, options = {} }) => {
	try {
		return jwt.verify(token, secret, options);
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = verify;
