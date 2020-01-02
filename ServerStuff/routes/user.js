const errors = require('restify-errors');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

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





    server.post('/users',  async(req, res, next)=>{
    // check for json

    if(!req.is('application/json')){
      res.send(400);
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var image = req.body.image;
    var phone = req.body.phone;
    var role = req.body.role;
    var age =req.body.age;
    let hash = bcrypt.hashSync(req.body.password,14);

    var password = hash;




var valEmail = false;
    try{

      for(var i =0; i<email.length; i++){
        if(email.charAt(i) == '@' && email.charAt(0) != '@'){
          valEmail = true;
        }
      }

      if(valEmail === false){
        res.send(400)
        return next(new errors.InvalidContentError("This is Not a Email"));
      }
    }
    catch(err){
      res.send(404);
      return next(new errors.InternalError("Missing Required Value"));

    }



    const users = new Users({
      firstname, lastname, email, image, phone, role,age, password

    });


    Users.find({firstname: firstname, lastname:lastname, email:email}, async function(err,doc){
        if(doc.length === 0 ){
          try{
            const newUsers = await users.save();
            res.send(newUsers._id, 200);




            next();
          } catch(err){
            res.send(500);
            return next(new errors.InternalError("err.message"));
          }
        }
        else{
          res.send(409);
        }

    });


});

server.post('/users/login', async(req,res,next) =>{
    if(!req.is('application/json')){
      return next(new errors.ResourceNotFoundError(`not application/json`));
    }

  Users.findOne({email : req.body.email}, (err,user)=>{
    if(err || !user || !bcrypt.compareSync(req.body.password, user.password) ){
        return next(new errors.ResourceNotFoundError(`Invalid Username or Password`));
    }
    // res.redirect({
    //   port: "3000",
    //   pathname : '/search'
    // }, next);
    if(req.body.email == user.email && bcrypt.compareSync(req.body.password, user.password)){

      res.send(user);

      // res.redirect(200, 'http://localhost:3000/search', next);

    }


  });


});






};
