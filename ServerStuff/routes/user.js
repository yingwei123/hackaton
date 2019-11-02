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


  server.post('/users', async(req, res, next)=>{
      // check for json
      if(!req.is('application/json')){

        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      const {rank,name, email, password, age, image, phone} = req.body;

      const users = new Users({
        name,
        email,
        password,
        age,
        image,
        phone,
        rank

      });
      try{
        const newUser = await users.save();
        res.send(201);
        next();
      } catch(err){
        return next(new errors.InternalError(err.message));
      }

    });






};
