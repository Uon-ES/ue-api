const mongoose = require("mongoose");

const url = "mongodb+srv://hkamran:Mustang99@main.k3febp4.mongodb.net/api";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(url);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
