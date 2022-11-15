import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {Link} from 'react-router-dom' 
import {FirebaseContext} from '../../Store/FirebaseContext'
import { PostContext } from '../../Store/PostContext';
import {useHistory} from 'react-router-dom'

function Posts() {

  let {firebase} = useContext(FirebaseContext)

  let [products,setProducts] = useState([])

  const {setPostdetails} = useContext(PostContext)
  const history = useHistory()
   
  useEffect(()=>{
    firebase.firestore().collection('products').get().then((snapshot)=>{
        const allPosts = snapshot.docs.map((product)=>{
          
          return {
            ...product.data(),
            id:product.id
          }

        })
        setProducts(allPosts)
    })
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {  

          products.map((product)=>{
           
            return(
         
            <div
            className="card"
            onClick={()=>{

              setPostdetails(product)
              history.push('/view')
            }}
          >

            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>

          </div>     

          )

          })        
          
        }  


        </div>
      </div>
     
    </div>
  );
}

export default Posts;
