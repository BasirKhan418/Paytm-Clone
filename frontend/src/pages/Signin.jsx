import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SubHeadind from '../components/SubHeadind'
import Input from '../components/Input'
import Buttion from '../components/Buttion'
import { Link } from 'react-router-dom'
import AlertText from '../components/AlertText';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoding ] = useState(false)
    const navigate = useNavigate()
    const onSubmit = async() => {
        setLoding(true)
        try{
            console.log(email,password)
            let res = await axios.post('http://localhost:3000/api/v1/user/signin',{email,password});
            setLoding(false)
            alert(res.data.message);
            localStorage.setItem('token',res.data.token);
            navigate('/dashboard');
        }
        catch(err){
            setLoding(false)
            alert(err.response.data.message);
        }
   
    }
    const me = async()=>{
        try{
         let a = await axios.get("http://localhost:3000/api/v1/user/me",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        navigate("/dashboard")
    }
        catch(err){
            // alert(err.response.data.message)
            localStorage.removeItem("token")
            // navigate("/signin")
        }
    }
  useEffect(()=>{
me();
  },[])
  return (
    <div className='bg-gray-300 h-[100vh] flex justify-center items-center'>
      <div className='min-h-[400px] w-96 bg-white rounded-lg shadow-xl'>
      <Header>
        Sign In
      </Header>
      <SubHeadind>
       Enter your credential to access your account
      </SubHeadind>
      <Input label='Email' type='email' placeholder='basir@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
      <Input label='Password' type='password' placeholder='' onChange={(e)=>setPassword(e.target.value)}/>
      <Buttion onClick={onSubmit}>{loading?"Loading ...":"Sign In"}</Buttion>
      <AlertText>
        Donot have an account? <Link to='/signup' className='underline'>Sign Up</Link>
      </AlertText>
      </div>
    </div>
  )
}

export default Signin
