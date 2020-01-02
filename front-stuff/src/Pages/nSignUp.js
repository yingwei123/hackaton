import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Redirect } from 'react-router-dom'
import '/Users/yingweili/Dropbox/hackaton/front-stuff/src/testing.css';

export default class nSignUp extends React.Component{
  state ={
    user:{
      username:"",
      password:"",
      email:"",
      key:""
    },
    redirect: false
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
          redirect : !this.state.redirect
        })
      }
      return res.json();

    }).then(function(json) {

      let data = JSON.stringify(json);

      console.log(data);

    }).catch(err => err);











   console.log("Whoa");
 }


  render(){
    if(this.state.redirect === true){
    return  <Redirect to ='/login' />
    }

    const{user : {email, password, key, username}} = this.state


    return(
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

       <TextField label = "Username"
       value = {username}
       onChange ={this.handleChange('username')}
       />
      <button onClick = {this.onSubmit}> Submit </button>

      </div>


    )
  }


}
