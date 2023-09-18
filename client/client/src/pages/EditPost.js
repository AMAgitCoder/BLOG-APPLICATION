import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor';


function EditPost() {

    const {id} =useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{

        fetch('http://localhost:4000/post/'+id).then(

            response=>{

                response.json().then(postInfo=>{

                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);

                });

            }
        );
    },[]);

    
   async function  updatePost(ev){
        
        ev.preventDefault();

        const data = new FormData();

        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);

        if(file?.[0]){

            data.set('file',file?.[0]);
        }

        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
          });
         
        if(response.ok){

             setRedirect(true);

        }

        else{

            console.log("NOT able to fetch");
        }

    }
    
    if(redirect){

        return <Navigate to={'/post/'+id}></Navigate>
      }


    
    return (
      
      <form onSubmit={updatePost}>
  
          <input type='title' placeholder='Title'  value={title} onChange={ev=>setTitle(ev.target.value)}></input>
          <input type='summary' placeholder='Summary' value={summary} onChange={ev=>setSummary(ev.target.value)}></input>
          <input type='file'  onChange={ev=>setFiles(ev.target.files)}></input>
           <Editor onChange={setContent} value={content}></Editor>
           <button style={{margin:'5px'}}>UPDATE POST</button>
  
      </form>
  
  
    )

}

export default EditPost