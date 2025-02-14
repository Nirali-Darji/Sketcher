import React from "react";
import { IoEye } from "react-icons/io5";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa6";
import { observer } from "mobx-react";
function ObjectList({
  name,
  handleShow,
  handleDel,
  icon: Icon,
  handleClick,
  id,
  isSelected,
  number,
  isHide,
}) {
  return (
    <>
      <div
        className={`p-5 flex mx-2 hover:bg-gray-100 cursor-pointer ${
          isSelected && "bg-gray-100"
        }`}
        onClick={handleClick}
        id={id}
      >
        <div className="flex mx-1 gap-2">
          <div className="my-auto text-2xl">
            <Icon />
          </div>
          <h3 className="text-lg">
            {name}-{number}
          </h3>
        </div>
        <div className="flex ml-auto my-auto">
          {isHide ? (
            <IoEye
              className="text-2xl mx-4 cursor-pointer"
              onClick={handleShow}
            />
          ) : (
            <FaEyeSlash
              className="text-2xl mx-4 cursor-pointer"
              onClick={handleShow}
            />
          )}

          <BsFillTrash3Fill
            className="text-xl cursor-pointer"
            onClick={handleDel}
          />
        </div>
      </div>
    </>
  );
}

export default observer(ObjectList);
