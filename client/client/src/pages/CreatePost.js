import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import EditPost from './EditPost';
import Editor from '../Editor';


function CreatePost() {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

   async function createNewPost(ev){

        const data = new FormData();

        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',file[0]);

            ev.preventDefault();

         const response =  await  fetch('http://localhost:4000/post',{

            method:'POST',
            body: data, 
            credentials:'include',

            });

            // console.log(await response.json());

            if(response.ok) {

                  setRedirect(true);
            } 
            
            

    }

    if(redirect){

      return <Navigate to={'/'}></Navigate>
    }

  return (
    
    <form onSubmit={createNewPost}>

        <input type='title' placeholder='Title'  value={title} onChange={ev=>setTitle(ev.target.value)}></input>
        <input type='summary' placeholder='Summary' value={summary} onChange={ev=>setSummary(ev.target.value)}></input>
        <input type='file'  onChange={ev=>setFiles(ev.target.files)}></input>
        <Editor value={content} onChange={setContent}></Editor>  
        <button style={{margin:'5px'}}>CREATE POST</button>

    </form>


  )
}

export default CreatePost