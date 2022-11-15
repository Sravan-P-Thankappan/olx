import React,{useContext,useEffect} from 'react';
import './App.css';
 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { AuthContext,FirebaseContext} from './Store/FirebaseContext';
import Post from './Store/PostContext';


function App() {
  
  let {setUser} =useContext(AuthContext)
  let {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
    

  })
  return (
    <div>
      <Post>
      <Router>

        <Route exact path={'/'}>
          <Home/>
        </Route>

        <Route  path={'/signup'}>
          <Signup/>
        </Route>

        <Route path={'/login'}>
        <Login/>
        </Route>
          
        <Route path={'/sell'}>
          <Create/>
      </Route>
      <Route path={'/view'}>
       <ViewPost/>
      </Route >

    </Router>

    </Post>
    </div>
  );
}

export default App;
