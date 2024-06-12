import React from 'react'

const SubHeadind = ({children}) => {
  return (
    <div>
        <div className='flex justify-center items-center'>
      <h1 className=' text-gray-600 text-xl text-center font-normal'> {children}</h1>
    </div>
    </div>
  )
}

export default SubHeadind
