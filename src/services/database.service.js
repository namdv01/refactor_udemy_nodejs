const knex = require("knex");

class Database {
  constructor(options) {
    this.options = options;
  }
  getConnection() {
    const db = knex(this.options);
    return db;
  }
}

module.exports = new Database({
  client: 'pg',
  connection: {
    host: process.env.POSTGRE_HOST,
    port: process.env.POSTGRE_PORT,
    user: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PW,
    database: process.env.POSTGRE_DB
  }
});