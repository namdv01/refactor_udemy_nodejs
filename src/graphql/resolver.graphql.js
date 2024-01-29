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

  async createPost(parent, args) {
    const index = parent.findIndex(p => +p.id === +args.id);
    if (index >= 0) {
      throw new Error('id post be exist');
    }
    parent.push(args);
    await this.redis.set('posts', JSON.stringify(parent));
  }

  async delPost(parent, args) {
    const newParent = parent.filter(p => +p.id !== +args.id);
    await this.redis.set('posts', JSON.stringify(newParent));
  }

  async updatePost(parent, args) {
    const index = parent.findIndex(p => +p.id === +args.id);
    if (index < 0) {
      throw new Error('id post not be exist');
    }
    const contentUpdate = {};
    if (args.title) {
      contentUpdate.title = args.title;
    }
    if (args.body) {
      contentUpdate.body = args.body;
    }
    parent[index] = { ...parent[index], ...contentUpdate };
    await this.redis.set('posts', JSON.stringify(parent));
  }
}

module.exports = new Resolver();