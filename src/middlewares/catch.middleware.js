const { BadRequestException } = require("../services/error.service");
const MESSAGE = require("../utils/message.util");

module.exports = async (err, req, res, next) => {
  if (err instanceof BadRequestException) {
    return res.status(err.code).send(err.message);
  }
  if (err instanceof Error) {
    return res.status(500).send(MESSAGE.SERVER_ERROR);
  }
}