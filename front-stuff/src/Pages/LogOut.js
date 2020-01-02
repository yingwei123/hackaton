import React from 'react'
import {Redirect} from 'react-router-dom'
export default class LogOut extends React.Component{

state= {
  redir :false
}

logout = ()=>{
  this.setState({
    redir: !this.state.redir
  })
  localStorage.clear();

}



render(){
  if(this.state.redir === true){
    return <Redirect to ='/login' />
  }

  return(
    <button onClick ={this.logout}> LogOut </button>
  )
}

}
