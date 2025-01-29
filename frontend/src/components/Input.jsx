import React from 'react'

const Input = ({onChange , placeHolder , value , type}) => {
  return (
    
        <input 
        type={type}
        className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
         value={value} 
         placeholder={placeHolder} 
         onChange={(e)=>onChange(e)} />
    
  )
}

export default Input
