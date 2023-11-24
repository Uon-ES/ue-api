const GenericRepository = require("../../repository");
const { Admin } = require("./model");

const adminRepo = new GenericRepository(Admin);

module.exports = adminRepo;
