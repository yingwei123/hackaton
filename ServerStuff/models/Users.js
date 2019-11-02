const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');

 const UsersSchema = new mongoose.Schema({
   name: {
     type:String,

     trim :true
   },
   email:{
     type :String,

     trim:true
   },
   password:{
     type:String,

     trim:true


   },
   age:{
     type : Number,
     trim:true
   },
   image:{
     type :String,
     trim:true

   },
   phone:{
     type : String,

     trim:true

   },
   
   rank:{
      type:String,

      trim:true
   }

 });
 UsersSchema.plugin(timestamp);

 const Users = mongoose.model('User',UsersSchema);
 module.exports = Users
