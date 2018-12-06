import React, { Component } from 'react';
import fire from './config/fire';
import Firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      userId:'',
      flag: false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup = (e) => {
    e.preventDefault();
    let userName = this.state.userName;
    console.log("userName", userName);
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log('user : ', u.user.uid);
      this.setState({userId: u.user.uid});
      if(u !== null) {
        fire.database().ref('Users').push({ 
          name: userName,
          userId: u.user.uid
        })
    
      }
    }).then((u)=> {})
    .catch((error) => {
        console.log(error);
      })
  }

  handleClick = () => {
    this.setState({flag: !this.state.flag})
  }

  render() {
    return (
       <div className="container" style={{ background: '#EFF0F0'}}>
       <br/>
       <h1 style={{}}>Share you'r photos</h1>
       <br/>
       <br/>
    <form>

       {this.state.flag === true &&
        <div className="form-group">
        <label htmlFor="exampleInputUserName1">User name</label>
        <input value={this.state.userName} onChange={this.handleChange} type="text" name="userName" className="form-control" id="exampleInputUserName1" placeholder="User name" />
        </div>
       }

      <div className="form-group">
       <label htmlFor="exampleInputEmail1">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>

      <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>

      {this.state.flag === false &&
         <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
       }

      {this.state.flag === false && <a  style={{marginLeft: '25px'}} href="#" onClick={this.handleClick}>signup </a>}
      {this.state.flag === true &&  <button onClick={this.signup}  className="btn btn-success">Signup</button>}
 </form>

 
 </div>
    );
  }
}
export default Login;
