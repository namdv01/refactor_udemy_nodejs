const databaseService = require("../services/database.service");
const { BadRequestException } = require("../services/error.service");
const jwtUtil = require("../utils/jwt.util");
const MESSAGE = require("../utils/message.util");

module.exports = {
  async isAuth(req, res, next) {
    const token = req.cookies?.udemy_express;
    if (!token) {
      throw new BadRequestException(MESSAGE.LOGIN_ERROR, 401);
    }
    const decode = jwtUtil.jwtVerify(token);
    const connect = databaseService.getConnection();
    const userInDb = await connect('users').where({
      mail: decode.mail
    }).first();
    if (!userInDb || userInDb.token !== token) {
      throw new BadRequestException(MESSAGE.LOGIN_ERROR, 401);
    }
    req.user = decode;
    next();
  }
}