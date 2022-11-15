import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../Store/FirebaseContext'
import { useHistory } from 'react-router-dom';


const Create = () => {

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  let [name,setName] = useState('')
  let [category,setCategory] = useState('')
  let [price,setPrice] = useState('')
  let [image,setImage] = useState(null)

  let [error,setError]  = useState(false)
  
  const date = new Date()
  const handleSubmit = ()=>{
     
    if(name.length==0||category.length==0||price.length==0)
    {
        setError(true)
    }
  else{



    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
    ref.getDownloadURL().then((url)=>{

    console.log(url);
    firebase.firestore().collection('products').add({
       name,
       category,
       price,
       url,
       userId:user.uid,
       createdAt:date.toDateString()
    }).then(()=>{

      history.push('/')

    })


}).catch((err)=>{
  console.log('url err'+err);
})
    }).catch((err)=>console.log(err,err.message))

  }
      
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {error&&<label className='text-danger'>All Field Is Required</label>}
          <br/>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
            onChange={(e)=>setPrice(e.target.value)}
            />
            <br />
          <br />
          <img alt="Posts" className='ml-5' width="200px" height="200px" src={image ? URL.createObjectURL(image) :''}></img>
            <br />
            <input className="input" type="file"
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
