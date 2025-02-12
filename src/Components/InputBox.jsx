import React from 'react'

export default function InputBox({label, value}) {
  return (
   <>
<div className='flex bg-gray-100 my-3 gap-1 px-3 py-1 rounded-lg'>
<div className='text-muted'>
    {label} :
</div>
<input className='w-62 ml-auto outline-0' type='number' value={value}/>
</div>
   </>
  )
}
