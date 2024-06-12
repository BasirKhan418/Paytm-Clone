/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Buttion from "./Buttion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Users = () => {
    // Replace with backend call
 
    const [users, setUsers] = useState([{
        firstName: "Harkirat",
        lastName: "Singh",
        _id: 1
    }]);
    const [filter,setfilter] = useState("")
    const SearchUser = async()=>{
        try{
            let a = await axios.get("http://localhost:3000/api/v1/user?filter="+filter,{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
            })
        setUsers(a.data.users)
        }
        catch(err){
            alert(err.response.data.message)
        }
    }
useEffect(()=>{
    SearchUser()
},[filter])

    return <>
        <div className="font-bold text-lg mx-4">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-200 mx-4" onChange={(e)=>{setfilter(e.target.value)}}></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}


function User({user}) {
    const navigate = useNavigate()
    return <div className="flex justify-between m-4">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.name&&user.name[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.name} - : - {user.email}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Buttion onClick={()=>{
             navigate("/send?id="+user._id+"&&name="+user.name)
             console.log("clicking")
            }}>Send Money</Buttion>
        </div>
    </div>
}