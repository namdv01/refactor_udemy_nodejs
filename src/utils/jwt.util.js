const jwt = require('jsonwebtoken');
const { BadRequestException } = require('../services/error.service');

module.exports = {
  jwtSign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {});
  },

  jwtVerify(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new BadRequestException(error, 401);
    }
  }
}