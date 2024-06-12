import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SubHeadind from '../components/SubHeadind'
import Input from '../components/Input'
import Buttion from '../components/Buttion'
import { Link } from 'react-router-dom'
import AlertText from '../components/AlertText';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [name,setName] = useState('')
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoding ] = useState(false)
    //me endpont
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
            // navigate("/signin")
        }
    }
const onSubmit = async() => {
    setLoding(true)
console.log(name,email,password)
try{
    let res = await axios.post('http://localhost:3000/api/v1/user/signup',{name,email,password});
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
useEffect(()=>{
me();

},[])
  return (
    <div>
      <div className='bg-gray-300 h-[100vh] flex justify-center items-center'>
      <div className='min-h-[500px] w-96 bg-white rounded-lg shadow-xl'>
      <Header>
        Sign Up
      </Header>
      <SubHeadind>
       Enter your information to create an account
      </SubHeadind>
      <Input label='Full Name' type='text' placeholder='John Doe' onChange={(e)=>setName(e.target.value)}/>
      <Input label='Email' type='email' placeholder='basir@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
      <Input label='Password' type='password' placeholder='' onChange={(e)=>setPassword(e.target.value)}/>
      <Buttion onClick={onSubmit}>{loading? "Loading ...":"Sign Up"}</Buttion>
      <AlertText>
        Already have an account? <Link to='/signin' className='underline'>Sign In</Link>
      </AlertText>
      </div>
    </div>
    </div>
  )
}

export default Signup
