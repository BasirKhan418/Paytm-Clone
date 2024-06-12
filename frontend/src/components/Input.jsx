import React from 'react'

const Input = ({label,type,placeholder,onChange}) => {
  return (
    <div className='flex flex-col p-2'>
        <label htmlFor={label} className='text-left px-3 font-bold '>{label}</label>
      <input type={type} placeholder={placeholder} id={label} className='px-2 border-2 py-2 rounded-lg mx-2 my-1' onChange={onChange}/>
    </div>
  )
}

export default Input
