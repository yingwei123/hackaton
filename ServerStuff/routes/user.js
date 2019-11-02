const errors = require('restify-errors');
const Users = require('../models/Users');

module.exports = server => {
  //get agents
  server.get('/users', async (req, res, next) => {
    try {
      const users = await  Users.find({});
      res.send(users);
      next();
    } catch(err) {
  return next(new errors.InvalidContentError(err));

    }

  });









};
