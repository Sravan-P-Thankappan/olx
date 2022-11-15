import React from 'react';

import Logo from '../../olx-logo.png';

import './Signup.css';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { useHistory } from 'react-router-dom'

export default function Signup() {

  let history = useHistory()

  let [username, setUsername] = useState('')

  let [useremail, setUseremail] = useState('')

  let [userphone, setUserphone] = useState('')

  let [userpassword, setUserpassword] = useState('')

  let [error,setError] = useState(false)

  let { firebase } = useContext(FirebaseContext)



  let userSignup = (e) => {
    
    e.preventDefault() 

if(
  username.length==0||username.length<3||useremail.length==0||userphone.length<10||userpassword.length<6
  ) {
    setError(true)
  }

  else{

    console.log(useremail);

    firebase.auth().createUserWithEmailAndPassword(useremail, userpassword)

      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({
            id: user.uid,
            username: username,
            phone: userphone,
            email:useremail
          }).then(() => {
            history.push('/login')

          })

        })

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        // ..
      });

    }

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img className='ml-5' width="200px" height="200px" src={Logo}></img>

        <form onSubmit={userSignup} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            // value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
          {error &&username.length<3? <label className='text-danger'>Write Proper Username</label>:null}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            // value={username}

            onChange={(e) => setUseremail(e.target.value)}
          />
           <br/>
          {error &&useremail.length==0?   <label className='text-danger'>Write Correct Email</label>:null}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            // value={userphone}

            onChange={(e) => setUserphone(e.target.value)}
          />
           <br/>
          {error &&userphone.length<10? <label className='text-danger'>Provide Correct Phone Number </label>:null}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            // value={userpassword}

            onChange={(e) => setUserpassword(e.target.value)}
          />
           <br/>
          {error &&userpassword.length<6? <label className='text-danger'>Password length Should be minimum 6 character</label>:null}
          <br />
          <br />
          <button >Signup</button>
        </form>

        <a>Login</a>

      </div>
    </div>
  );
}
