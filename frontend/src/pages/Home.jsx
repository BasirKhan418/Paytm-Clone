import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
    const navigate = useNavigate()
    const me = async()=>{
        try{
         let a = await axios.get("http://localhost:3000/api/v1/user/me",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        navigate("/dashboard");
    }
  
        catch(err){
            // alert(err.response.data.message)
            localStorage.removeItem("token")
            navigate("/signin")
        }
    }
    useEffect(()=>{
    me();
    },[])
  return (
    <div>
      this is home page
    </div>
  )
}

export default Home
