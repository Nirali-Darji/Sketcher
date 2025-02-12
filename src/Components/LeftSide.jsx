import { CiSearch } from "react-icons/ci";
import ObjectList from './ObjectList';
import { TbLine } from 'react-icons/tb';
import useSketcher from "../hooks/useSketcher";
import { observer } from "mobx-react";

 function LeftSide({sketcher}) {
  return (
    <>
    <div className="min-h-screen bg-gray-200/70 border-0 z-20 rounded-lg w-[350px] ">
        <div className='flex p-4'>
            <div className=''>
            <input className='outline-0' type='text' placeholder='List Of Created Object'/>
            </div>
            <CiSearch className='text-xl ml-auto cursor-pointer' />
        </div>
        <div className='flex border border-gray-400 w-80 mx-auto'>
        </div>
        {sketcher?.mEntities?.map((entity, index) => (
            <ObjectList key={index} name={entity.mType} icon={<TbLine/>}/>
          ))}
    </div>
    </>
  )
}


export default observer(LeftSide);