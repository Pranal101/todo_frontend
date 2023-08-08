import React, { useContext, useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const submiteHandler = async(e)=>{
    e.preventDefault()
    setLoading(true);
    try {
      const {data}  = await axios.post(`${server}/users/login`,{
        email,
        password
        },{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        }
        );
      
        toast.success(data.message);
        setIsAuthenticated(true);
        setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false);
      setLoading(false);
    }
};





  if(isAuthenticated) return <Navigate to = {"/"}></Navigate>


  return (
    <div className="login">
      <section>
        <form onSubmit={submiteHandler}>

        <input 
        value={email} onChange={(e)=>setEmail(e.target.value)}
        type="email" 
        placeholder="Email">
        </input>

        <input 
        value={password} onChange={(e)=>setPassword(e.target.value)}
        type="password" 
        placeholder="Password">
        </input>

          <button disabled={loading} type="submit">Login</button>
          <h4>Or</h4>
          <Link to={"/register"}>Sign up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login