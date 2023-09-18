import React from 'react'
import {useState} from "react";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from '../UserContext';

function LoginPage() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

 async function login(ev){

    ev.preventDefault();

   const response =  await fetch('http://localhost:4000/login',{

        method:'POST',
        body:JSON.stringify({username,password}),
        headers:{'Content-Type': 'application/json'},
        credentials:'include',
        });

        if(response.ok){


          response.json().then(userInfo=>{

            setUserInfo(userInfo); 
            setRedirect(true);

          })

        }
        else{

          alert('wrong credentials');
        }

  }

  if(redirect) {

    return <Navigate to={'/'}></Navigate>
  }


  return(

    <form className='login' onSubmit={login}>
     <h1>Login</h1>   
    <input type='text' placeholder='username' value={username} onChange={ev=>setUsername(ev.target.value)}></input>
    <input type='password' placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}></input>
    <button>Login</button>
    </form>

  )
}

export default LoginPage