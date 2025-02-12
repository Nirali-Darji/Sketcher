import React from 'react'

function Property({name}) {
  return (
    <>
    <div className='text-lg my-3'>
        {name}
    </div>
    <div className='flex border border-gray-400 w-80 mx-auto'></div>
    </>
  )
}

export default Property;
