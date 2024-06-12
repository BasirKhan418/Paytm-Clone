/* eslint-disable react/prop-types */
import React from 'react'

const Appbar = ({name}) => {
    console.log(name)
  return (
    <div>
      <div className="shadow-lg h-14 flex justify-between m-4 border-2 rounded-full">
        <div className="flex flex-col justify-center h-full ml-4 font-bold  shadow-lg rounded">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 font-semibold">
                Welcome
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2" onClick={()=>{
                localStorage.removeItem("token")
               alert("Logged out ,Successfully!");
                window.location.reload();
            }}>
                <div className="flex flex-col justify-center h-full text-xl">
                    {name&&name[0].toUpperCase()}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Appbar
