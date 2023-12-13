const { Redis: ioredis } = require('ioredis');

class Redis {
  constructor(options) {
    this.options = options;
  }

  getConnection() {
    const redis = new ioredis(this.options);
    return redis;
  }
}

module.exports = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PW,
  db: process.env.REDIS_DB || 0,
})