import { GrUpdate } from "react-icons/gr";
import HorizontalButton from "./HorizontalButton";
import LineProperties from "./LineProperties";
import CircleProperties from "./CircleProperties";
import EllipseProperties from "./EllipseProperties";
import PollyLineProperties from "./PollyLineProperties";
import ColorPallet from "./ColorPallet";
import { IoEye } from "react-icons/io5";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useContext } from "react";
import { SketcherContext } from "../Context/SketcherInstanceContext";
import { observer } from "mobx-react";
import EntityType from "../utils/EntityType";
import OpacityBox from "./OpacityBox";

function RightSide() {
  const sketcher = useContext(SketcherContext);

  const handleDelete = (e) => {
    e.stopPropagation();
    sketcher?.removeEntity(sketcher?.selectedEntity);
  };
  const handleHide = (e) => {
    e.stopPropagation();
    sketcher?.updateVisible(sketcher?.selectedEntity);
  };
  const renderProperties = () => {
    if (!sketcher?.selectedEntity) return null;

    switch (sketcher.selectedEntity.mType) {
      case EntityType.LINE:
        return <LineProperties name={"Line"} />;
      case EntityType.CIRCLE:
        return <CircleProperties />;
      case EntityType.POLYLINE:
        return <PollyLineProperties />;
      case EntityType.ELLIPSE:
        return <EllipseProperties />;
      default:
        return <div>Unknown entity type</div>;
    }
  };
  return (
    <>
      <div className="min-h-screen z-20 ml-auto bg-gray-200/70 border-0 rounded-lg w-[350px] p-3">
        {sketcher?.selectedEntity ? (
          <>
            <div className="text-xl font-semibold">Properties :</div>
            {renderProperties()}
            <div className="flex gap-3">
              <ColorPallet />
              <OpacityBox />
            </div>
            <div className="flex flex-col gap-3">
              <HorizontalButton
                name={"Hide"}
                icon={<IoEye />}
                handleClick={handleHide}
              />
              <HorizontalButton
                name={"Delete"}
                icon={<BsFillTrash3Fill />}
                handleClick={handleDelete}
              />
            </div>
          </>
        ) : (
          <>
            <div className="h-full flex m-1 justify-center align-items-center border rounded-lg border-gray-400 border-dotted">
              <div className="my-auto">Select an object</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default observer(RightSide);
