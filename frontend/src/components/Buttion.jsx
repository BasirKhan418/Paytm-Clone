import React from 'react'

const Buttion = ({children,onClick}) => {
  return (
      <div className='mx-2'>
      <button className='font-medium text-xl bg-black border rounded-lg w-full text-white px-2 py-2' onClick={onClick}>
       {children}
      </button>
      </div>
  )
}

export default Buttion
