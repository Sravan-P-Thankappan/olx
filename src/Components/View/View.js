import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { PostContext } from '../../Store/PostContext';


import './View.css';
function View() {

  const [userDetails, setUserDetails] = useState()
  const { postdetails } = useContext(PostContext) 
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const {userId} = postdetails 
    firebase.firestore().collection('users').where('id', '==', userId).get().then((response) => {

      response.forEach(element => {

        setUserDetails(element.data())

      });

    }).catch((err)=>console.log(err))


  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img 
       
          src={postdetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetails.price} </p>
          <span>{postdetails.name}</span>
          <p>{postdetails.category}</p>
          <span>{postdetails.createdAt}</span>
        </div>

        {userDetails &&  <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        }

      </div>
    </div>
  );
}
export default View;
