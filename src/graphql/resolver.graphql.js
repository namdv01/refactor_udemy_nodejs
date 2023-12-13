const redisService = require("../services/redis.service");

class Resolver {
  constructor() {
    this.redis = redisService.getConnection();
  }

  async getPosts() {
    const posts = await this.redis.get('posts');
    return JSON.parse(posts);
  }

  async getUsers() {
    const users = await this.redis.get('users');
    return JSON.parse(users);
  }
}

module.exports = new Resolver();