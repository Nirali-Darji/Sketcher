import {  GrUpdate } from "react-icons/gr";
import HorizontalButton from './HorizontalButton';
import LineProperties from './LineProperties';
import ColorPallet from './ColorPallet';
import { IoEye } from 'react-icons/io5';
import { BsFillTrash3Fill } from 'react-icons/bs';

export default function RightSide() {
  return (
    <>
      <div className='min-h-screen z-20 ml-auto bg-gray-200/70 border-0 rounded-lg w-[350px] p-3'>
      <div className="text-xl font-semibold">Properties :</div>
      <LineProperties name={"Line 1"}/>
      <HorizontalButton name={"Update"} icon={<GrUpdate/>}/>
      <ColorPallet/>
      <div className="flex flex-col gap-3">
      <HorizontalButton name={"Hide"} icon={<IoEye/>}/>
      <HorizontalButton name={"Delete"} icon={<BsFillTrash3Fill/>}/>
      </div>
      </div>
    </>
  
  )
}
