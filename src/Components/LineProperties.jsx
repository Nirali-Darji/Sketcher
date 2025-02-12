import React from 'react'
import Property from './Property'
import InputBox from './InputBox'

export default function LineProperties({name}) {
  return (
    <>
    <Property name={name}/>
    <div className='p-3 space-y-5'>
        <div>
        <div className='text-lg font-medium'>
            Starting Point 
        </div>
        <InputBox label={"x"}/>
        <InputBox label={"y"}/>
        <InputBox label={"z"}/>
        </div>
        <div>
        <div className='text-lg font-medium'>
            Ending Point 
        </div>
        <InputBox label={"x"}/>
        <InputBox label={"y"}/>
        <InputBox label={"z"}/>
        </div>
    </div>
    </>
  )
}
