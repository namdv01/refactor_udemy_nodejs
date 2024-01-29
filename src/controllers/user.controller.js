const databaseService = require('../services/database.service');
const { BadRequestException } = require('../services/error.service');
const { verify, hash } = require('../utils/bcrypt.util');
const { jwtSign } = require('../utils/jwt.util');
const MESSAGE = require('../utils/message.util');

class UserController {
  async login(req, res) {
    const { mail, password } = req.body;
    const connect = databaseService.getConnection();
    const user = await connect('users').where({
      mail
    }).first();
    if (!user) {
      throw new BadRequestException(MESSAGE.LOGIN_ERROR, 401);
    }
    if (!verify(password, user.password)) {
      throw new BadRequestException(MESSAGE.LOGIN_ERROR, 401);
    }
    const token = await jwtSign({
      id: user.id,
      mail,
    });
    await connect('users').where({
      mail
    }).update({ token });
    res.cookie('udemy_express', token);
    return res.send(MESSAGE.LOGIN_SUCCESS);
  }

  async register(req, res) {
    const { mail, password } = req.body;
    const connect = databaseService.getConnection();
    const userExists = await connect('users').where({
      mail
    }).first();
    if (userExists) {
      throw new BadRequestException(MESSAGE.REGISTER_ERROR, 402);
    }
    await connect('users').insert({
      mail,
      password: hash(password),
    });
    return res.json({
      mail,
    });
  }

  async logout(req, res) {
    const connect = databaseService.getConnection();
    await connect('users').where({
      mail: req.user?.mail,
    }).update({
      token: '',
    });
    res.clearCookie('udemy_express');
    return res.send(MESSAGE.LOGOUT_SUCCESS);
  }

  async checkLogin(req, res) {
    return res.send('check login success');
  }
}

module.exports = new UserController();