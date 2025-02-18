import { useContext, useEffect, useState } from "react";
import Property from "./Property";
import InputBox from "./InputBox";
import HorizontalButton from "./HorizontalButton";
import { GrUpdate } from "react-icons/gr";
import { SketcherContext } from "../Context/SketcherInstanceContext";
import { observer } from "mobx-react";

function CircleProperties() {
  const sketcher = useContext(SketcherContext);

  const [centerX, setCenterX] = useState(
    sketcher?.selectedEntity.mConstructionPoints[0].x
  );
  const [centerY, setCenterY] = useState(
    sketcher?.selectedEntity.mConstructionPoints[0].y
  );
  const [centerZ, setCenterZ] = useState(
    sketcher?.selectedEntity.mConstructionPoints[0].z
  );

  const [radius, setRadius] = useState(
    sketcher.selectedEntity?.geometry?.parameters?.radius
  );

  const handleCenterChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    if (axis === "x") setCenterX(value);
    if (axis === "y") setCenterY(value);
    if (axis === "z") setCenterZ(value);
  };

  const handleRadiusChange = (event) => {
    const value = parseFloat(event.target.value);
    setRadius(value);
  };

  const handleUpdate = () => {
    if (sketcher?.selectedEntity) {
      const updatedEntity = sketcher.selectedEntity;
      updatedEntity.mConstructionPoints[0] = {
        ...updatedEntity.mConstructionPoints[0],
        x: centerX,
        y: centerY,
        z: centerZ,
      };
      sketcher.selectedEntity.setConstructionPoints(
        updatedEntity.mConstructionPoints
      );
      sketcher.selectedEntity.updateRadius(radius);
    }
  };

  useEffect(() => {
    if (sketcher?.selectedEntity) {
      const { x, y, z } = sketcher.selectedEntity.mConstructionPoints[0];
      const radiusValue = sketcher.selectedEntity?.geometry?.parameters?.radius;

      if (
        centerX !== x ||
        centerY !== y ||
        centerZ !== z ||
        radius !== radiusValue
      ) {
        setCenterX(x);
        setCenterY(y);
        setCenterZ(z);
        setRadius(radiusValue);
        console.log(radiusValue);
      }
    }
  }, [sketcher?.selectedEntity, centerX, centerY, centerZ, radius]);
  return (
    <>
      <Property name="Circle" />
      <div className="p-3 space-y-5">
        <div>
          <div className="text-lg font-medium">Center</div>
          <InputBox
            label={"x"}
            value={centerX}
            onChangeHandler={handleCenterChange("x")}
          />
          <InputBox
            label={"y"}
            value={centerY}
            onChangeHandler={handleCenterChange("y")}
          />
          <InputBox
            label={"z"}
            value={centerZ}
            onChangeHandler={handleCenterChange("z")}
          />
        </div>
        <div>
          <div className="text-lg font-medium">Radius</div>
          <InputBox
            label={"R"}
            value={radius}
            onChangeHandler={handleRadiusChange}
          />
        </div>
      </div>

      <HorizontalButton
        name={"Update"}
        icon={<GrUpdate />}
        handleClick={handleUpdate}
      />
    </>
  );
}
export default observer(CircleProperties);
