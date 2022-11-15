import React,{createContext,useState} from 'react'

export const PostContext = createContext(null)


 let Post = ({children})=>{
     
        const [postdetails,setPostdetails] = useState()

        return (
         <PostContext.Provider value={{postdetails,setPostdetails}}>
           
           {children}
         </PostContext.Provider>
              
        )

}

export default Post

