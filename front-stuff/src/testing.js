import React from 'react'
import TextField from '@material-ui/core/TextField'
import Ok from '/Users/yingweili/Dropbox/hackaton/front-stuff/src/Pages/Ok.js'
import LogOut from '/Users/yingweili/Dropbox/hackaton/front-stuff/src/Pages/LogOut.js'
import nSignUp from '/Users/yingweili/Dropbox/hackaton/front-stuff/src/Pages/nSignUp.js'
import Button from '@material-ui/core/Button'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => {
  return(
  <div>


    <Button>
     <Link to ="/dashboard">Home </Link>
     </Button>

     <Button>
         <Link to = "/dashboard/users">Get all Users</Link>
         </Button>




          <Route  path="/dashboard/users" component={Ok} />




  </div>
)
}

class Login extends React.Component {
  state = {
    user:{
    email:"",
    password:""
    },
    redirectToReferrer: false
  }
  handleChange = name => ({target: {value}}) => {
   this.setState({
     user:{
       ...this.state.user,
       [name]:value
     }

   })
 };
  login = () => {
    const { user } = this.state

    fetch('http://localhost:3001/users/login', {
     method: 'POST',
     body: JSON.stringify(user),
     headers: {
           'Content-Type': 'application/json'
       }
    }).then(res => {

    if(res.status === 200){
      fakeAuth.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }

      return res.json();

    }).then(function(json) {


      let data = JSON.stringify(json);

      console.log(data);
      localStorage.setItem("user"  , data);

    }).catch(err => {

    });



  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
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
      <button onClick = {this.login}> Submit </button>

      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        localStorage.clear();
        fakeAuth.signout(() => history.push('/'))

      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

export default function AuthExample () {

  return (
    <Router>
      <div>
        <AuthButton/>

          <Link to="/public">Sign Up</Link>
          <div> </div>
          <Link to="/dashboard">Log In</Link>

        <Route path="/public" component={nSignUp}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path='/dashboard' component={Protected} />
      </div>
    </Router>
  )
}
