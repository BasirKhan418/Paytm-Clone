import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import { Balance } from '../components/Balance'
import  { Users } from '../components/User'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Dashboard = () => {
    const [balance,setBalance] = useState(0);
    const [user,setUser] = useState({})
    const navigate = useNavigate()
    const getBalance = async()=>{
        try{
     let a  = await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
      
     })
     setBalance(a.data.balance);
        }
        catch(err){
            // alert(err.response.data.message)
        }
    }
    const me = async()=>{
        try{
         let a = await axios.get("http://localhost:3000/api/v1/user/me",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        setUser(a.data.user);
    
    }
        catch(err){
            // alert(err.response.data.message)
            localStorage.removeItem("token")
            navigate("/signin")
        }
    }
    useEffect(()=>{
    getBalance();
    me();
    },[])
    console.log(user.name)
  return (
    <div>
        <Appbar name={user.name}/>
        <Balance value={balance}/>
        <Users/>
    </div>
  )
}

export default Dashboard
