const { sign } = require("jsonwebtoken");

const jwtSign = ({ payload, secret, options }) => {
	return sign(payload, secret, options);
};

module.exports = jwtSign;
