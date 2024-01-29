const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const resolverGraphql = require("./resolver.graphql");

const UserCore = new GraphQLObjectType({
  name: 'UserCore',
  fields: {
    id: {
      type: GraphQLID,
      resolve: user => user.id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    info: {
      type: GraphQLString,
      resolve: user => user.info
    },
  }
});

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: {
      type: GraphQLID,
      resolve: (post) => post.id,
    },
    title: {
      type: GraphQLString,
      resolve: (post) => post.title,
    },
    body: {
      type: GraphQLString,
      resolve: (post) => post.body,
    },
    author: {
      type: UserCore,
      resolve: async (post) => {
        const users = await resolverGraphql.getUsers();
        return users.find(u => u.id === post.idAuthor);
      }
    }
  }
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLID,
      resolve: user => user.id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    info: {
      type: GraphQLString,
      resolve: user => user.info
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user) => {
        const posts = await resolverGraphql.getPosts();
        return posts.filter(p => p.idAuthor === user.id);
      }
    }
  }
});

const RootType = new GraphQLObjectType({
  name: 'RootType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => resolverGraphql.getUsers()
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => resolverGraphql.getPosts()
    }
  }
});

const PostMutation = new GraphQLObjectType({
  name: 'PostMutation',
  fields: {
    find: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const posts = await resolverGraphql.getPosts();
        return posts.find(p => +p.id === +parent.id);
      }
    },
    create: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        idAuthor: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      resolve: async (args) => {
        const posts = await resolverGraphql.getPosts();
        await resolverGraphql.createPost(posts, args);
        return true;
      }
    },
    delete: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (args) => {
        const posts = await resolverGraphql.getPosts();
        await resolverGraphql.delPost(posts, args);
        return true;
      }
    },
    update: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      resolve: async (args) => {
        const posts = await resolverGraphql.getPosts();
        await resolverGraphql.updatePost(posts, args);
        return true;
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    post: {
      type: PostMutation,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        idAuthor: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return args;
      }
    }
  }
});

module.exports = {
  RootType,
  RootMutation,
}