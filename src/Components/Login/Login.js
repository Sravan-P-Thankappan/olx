import React from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import {useState,useContext} from 'react'
import {FirebaseContext} from '../../Store/FirebaseContext'
import {useHistory,Link} from 'react-router-dom'

function Login() {

  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let {firebase}      = useContext(FirebaseContext)
  let [error,setError] = useState(false)
  let history = useHistory()

  let userLogin = (e)=>{
         
    e.preventDefault()

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

      var user = userCredential.user;
      history.push('/')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      setError(true)

    });  }



  return (
    <div>
      <div className="loginParentDiv">
        <img className='ml-5' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={userLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}

          />
          <br/>
           {error && <label className='text-danger'>Incorrect Email Or Password</label>}

          <br />
          <br />
          <button>Login</button>
        </form>
         <Link className='text-decoration-none text-body' to={'/Signup'}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
