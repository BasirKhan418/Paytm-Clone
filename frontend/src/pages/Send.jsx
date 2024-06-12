import axios from 'axios';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Send = () => {
    const [router,setRouter] = useSearchParams();
    const navigate = useNavigate();
    const [amount,setAmount] = useState(0);
    console.log(router.get("name"));
    const handleSubmit = async()=>{
        try{
let a =await axios.post("http://localhost:3000/api/v1/account/transfer",{
    amount:amount,
    to:router.get("id")
},{
    headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
    }
})
alert("Transfer Successfull Message:"+a.data.message);
navigate("/dashboard");
        }
        catch(err){
            alert(err.response.data.message)
        }
    }
  return (
    <div>
 <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white uppercase">{router.get("name")[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold uppercase">{router.get("name")}</h3>
                </div>
                <div className="space-y-4 my-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                    </div>
                    <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={handleSubmit}>
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Send
