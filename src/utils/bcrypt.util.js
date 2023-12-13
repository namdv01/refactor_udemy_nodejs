const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
module.exports = {
  hash(text) {
    const payload = bcrypt.hashSync(text, salt);
    return payload;
  },

  verify(text, payload) {
    const isVerify = bcrypt.compareSync(text, payload);
    return isVerify;
  }
}