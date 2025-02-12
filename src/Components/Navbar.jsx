import { FiSave } from "react-icons/fi";
import { MdFileUpload } from "react-icons/md";
import Button from "./Button";
// import useSketcher from "../hooks/useSketcher";
import { enumOptions } from "../utils/EntityType";

function Navbar({sketcher}) {
      
      const handleClick = (e) => {
        if(sketcher){
        sketcher.currentEntityType = e.target.value;
        sketcher.isSphereVisible = true;
        console.log(e.target.value);
      }
      };
    
  return <>
  <div className="flex mx-7 z-20 h-24">
    <div className="flex bg-gray-200/70 rounded-xl ">
    {enumOptions.map((e,index) => (
        <Button name={e.type} key={index} icon={e.icon} value={e.label} onClick={handleClick} />
      ))}
       
    </div>
    <div className="flex mx-6 ">
    <Button name={"Save"} className={"mx-4 text-center bg-gray-200/70 rounded-xl"} icon={FiSave}/>
    <Button name={"Upload"} className={" bg-gray-200/70 rounded-xl"} icon={MdFileUpload}/>
    </div>
  </div>
  </>;
}

export default Navbar;
