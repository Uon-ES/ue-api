const GenericRepository = require("../../repository");
const { Participant } = require("./model");

const participantRepo = new GenericRepository(Participant);

module.exports = participantRepo;
