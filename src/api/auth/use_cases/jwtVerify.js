const { verify, sign } = require("jsonwebtoken");

const jwtVerify = (refreshToken, user) => {
	const result = {
		userNotFound: false,
		accessToken: null,
	};

	try {
		verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err || user.email !== decoded.user.email) {
					result.userNotFound = true;
				}
				const accessToken = sign(
					{
						email: decoded.email,
						type: decoded.type,
						firstName: decoded.firstName,
						lastName: decoded.lastName,
						phoneNumber: decoded.phoneNumber,
						status: decoded.status,
						deviceType: decoded.deviceType,
						pinsToView: decoded.pinsToView,
						createdAt: decoded.createdAt,
						updatedAt: decoded.updatedAt,
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "15d" }
				);
				result.accessToken = accessToken;
			}
		);

		return result;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = jwtVerify;
