import { CiSearch } from "react-icons/ci";
import ObjectList from "./ObjectList";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { SketcherContext } from "../Context/SketcherInstanceContext";
import { enumOptions } from "../utils/EntityType";

function LeftSide() {
  const sketcher = useContext(SketcherContext);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEntityUuid, setSelectedEntityUuid] = useState(null);

  useEffect(() => {
    const selectedEntity = sketcher?.selectedEntity;

    if (selectedEntity) {
      setSelectedEntityUuid(selectedEntity.uuid);
    }
  }, [sketcher?.selectedEntity]);

  useEffect(() => {
    if (selectedEntityUuid) {
      const selectedEntity = sketcher?.mEntities?.find(
        (entity) => entity.uuid === selectedEntityUuid
      );
      if (selectedEntity) {
        const index = sketcher.mEntities.indexOf(selectedEntity);
        setSelectedId(index);
      }
    }
  }, [selectedEntityUuid, sketcher?.mEntities]);

  const handleClick = (entity, id) => {
    sketcher?.setSelectedEntity(entity);
    setSelectedId(id);
  };

  const handleDelete = (entity) => (e) => {
    e.stopPropagation();
    sketcher?.removeEntity(entity);
    setSelectedId(null);
  };
  const handleHide = (entity) => (e) => {
    e.stopPropagation();
    sketcher?.updateVisible(entity);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-200/70 border-0 z-20 rounded-lg w-[350px] ">
        <div className="flex p-4">
          <div className="">
            <input
              className="outline-0"
              type="text"
              placeholder="List Of Created Object"
            />
          </div>
          <CiSearch className="text-xl ml-auto cursor-pointer" />
        </div>
        <div className="flex border border-gray-400 w-80 mx-auto"></div>
        {sketcher?.mEntities?.map((entity, index) => (
          <ObjectList
            icon={enumOptions.find((e) => e.type === entity.mType).icon}
            key={index}
            name={entity.mType}
            number={entity.mName}
            isSelected={selectedId === index}
            id={index}
            handleClick={() => handleClick(entity, index)}
            handleDel={handleDelete(entity)}
            handleShow={handleHide(entity)}
          />
        ))}
      </div>
    </>
  );
}

export default observer(LeftSide);
