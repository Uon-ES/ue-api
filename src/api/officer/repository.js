const GenericRepository = require("../../repository");
const { Officer } = require("./model");

const officerRepo = new GenericRepository(Officer);

module.exports = officerRepo;
