import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Redirect } from 'react-router-dom';
import Home from '/Users/yingweili/Dropbox/realstate-crm/client/src/pages/Home/Home.jsx'
import fakeAuth from '/Users/yingweili/Dropbox/realstate-crm/client/src/Testing.js'


export default class Login extends React.Component{

  state= {
    user:{
    email:"",
    password:""
    },

    auth: false
  }

  handleChange = name => ({target: {value}}) => {
   this.setState({
     user:{
       ...this.state.user,
       [name]:value
     }

   })
 };
 onSubmit = () =>{

   const { user } = this.state




    fetch('http://localhost:3001/users/login', {
     method: 'POST',
     body: JSON.stringify(user),
     headers: {
           'Content-Type': 'application/json'
       }
    }).then(res => {

    if(res.status === 200){
      this.setState({
        auth : !this.state.auth,

      })
    }

      return res.json();

    }).then(function(json) {


      let data = JSON.stringify(json);

      console.log(data);
      localStorage.setItem("agent"  , data);

    }).catch(err => {

    });

















   console.log("Whoa");
 }

render(){

  if(this.state.auth === true ){
  return  <Redirect to ='/' />
  }

  const{user : {email, password}} = this.state
  return (
    <div>

    <TextField
    label = "User Name or Email"
    value = {email}
    onChange = {this.handleChange('email')}
    />
    <TextField label ="Password"
    type ="password"
    value = {password}
    onChange = {this.handleChange('password')}
    />

    <button onClick = {this.onSubmit}> Submit </button>

    </div>



  )
}

}
