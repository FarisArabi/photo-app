import React, { Component } from 'react';
import fire from './config/fire';
import Login from './login';
import Home from './home';
import './App.css';

class App extends Component {

   constructor() {
    super();
    this.state = ({
      user: null,
      userID:''
    });
  }

  componentDidMount = () => {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
        this.setState({userID: user.uid});
        
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
     <div>
     {this.state.user ? ( <Home user = {this.state.userID}/>) : (<Login />)}
     </div>
  )}

  
}

export default App;
