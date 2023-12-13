const catchMiddleware = require('../middlewares/catch.middleware');
const userRoute = require('./user.route');
const graphqlRoute = require('../graphql/index.graphql');

module.exports = (app) => {
  app.use('/user', userRoute);
  app.use('/graphql', graphqlRoute);
  app.use(catchMiddleware);
}