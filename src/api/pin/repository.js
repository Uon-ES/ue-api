const GenericRepository = require("../../repository");
const { Pin } = require("./model");

const pinRepo = new GenericRepository(Pin);

module.exports = pinRepo;
