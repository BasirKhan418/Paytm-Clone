import React from 'react'

const Header = ({children}) => {
  return (
    <div className='flex justify-center items-center my-2'>
      <h1 className='font-bold text-black text-4xl p-1'> {children}</h1>
    </div>
  )
}

export default Header
