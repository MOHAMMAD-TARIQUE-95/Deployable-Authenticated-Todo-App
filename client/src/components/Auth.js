import { useState } from "react";
import {useCookies} from "react-cookie";


const Auth=()=>{
 const [isLogin,setIslogin]= useState(true);
 const [error,setError]= useState(null);
 const [email,setEmail]= useState(null);
 const [password,setPassword]=useState(null);
 const [confirmPassword,setConfirmPassword]=useState(null);
 const [cookies,setCookie,removeCookie] =useCookies(null)
 
 console.log(email, password, confirmPassword);
 console.log(cookies);


 const viewLogin=(status)=>{
  setIslogin(status)
  setError(null)
 };

const handleSubmit= async (e,endPoint)=>{
e.preventDefault()
if(!isLogin && password!==confirmPassword)
{
  setError('MAKE SURE PASSWORD MATCH!!')
}
 const response=await fetch(`http://localhost:8000/${endPoint}`,
  {
    method :'POST',
    headers:{'content-Type':'application/json'},
    body:JSON.stringify({email,password})
  })
  const data= await response.json()
  console.log(data);

  if(data.detail){
    setError(data.detail)
  }
  else{
    setCookie('Email',data.email)
    setCookie('AuthToken',data.token)
    window.location.reload()
  }

}

  return (
    <div className="auth-container">
    <div className="auth-container-box">
    
    <form>
     <h2>{isLogin ? "PLEASE LOGIN":"PLEASE SIGNUP"}</h2>
    <input
      type="email"
      placeholder="email"
      onChange={(e)=>{setEmail(e.target.value)}}
    />
    
    <input
      type="password"
      placeholder="password"
      onChange={(e)=>{setPassword(e.target.value)}}
    />
    {/* SHOWS ONLY WHEN USER SELECTS SIGNUP */}

    {!isLogin&&<input
      type="password"
      placeholder="confirm password"
      onChange={(e)=>{setConfirmPassword(e.target.value)}}
    />}
    <input
      type="submit" 
      className="create"
      onClick={(e)=> handleSubmit(e, isLogin? 'signin':'signup')}
    />

    {error ?? <p>{error}</p>}

     </form>

     
     <div className="auth-options">
      <button 
      style={{backgroundColor: !isLogin?'rgba(255,255,255)':'rgba(188,188,188)'}} 
      onClick={()=>viewLogin(false)} >Signup</button>
      <button 
      style={{backgroundColor: isLogin?'rgba(255,255,255)':'rgba(188,188,188)'}} 
      onClick={()=>viewLogin(true)} >Login</button>
     </div>
    </div>

    </div>
  );
}

export default Auth;
