import  { useContext, useEffect, useState } from 'react'
import Property from './Property'
import InputBox from './InputBox'
import HorizontalButton from './HorizontalButton'
import { GrUpdate } from 'react-icons/gr'
import { SketcherContext } from '../Context/SketcherInstanceContext'

function EllipseProperties() {
  const sketcher = useContext(SketcherContext);

  const [centerX, setCenterX] = useState(sketcher?.selectedEntity.mConstructionPoints[0].x);
  const [centerY, setCenterY] = useState(sketcher?.selectedEntity.mConstructionPoints[0].y);
  const [centerZ, setCenterZ] = useState(sketcher?.selectedEntity.mConstructionPoints[0].z);

  const [radiusX, setRadiusX] = useState(Math.abs(sketcher.selectedEntity?.mConstructionPoints[0].x - sketcher.selectedEntity?.getLastConstructionPoint().x));
  const [radiusY, setRadiusY] = useState(Math.abs( sketcher.selectedEntity?.getLastConstructionPoint().z- sketcher.selectedEntity.mConstructionPoints[0].z));

  const handleCenterChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    if (axis === "x") setCenterX(value);
    if (axis === "y") setCenterY(value);
    if (axis === "z") setCenterZ(value);
  };

  const handleRadiusChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    if (axis === "x") setRadiusX(value);
    else setRadiusY(value);
  };

  const handleUpdate = () => {
    if (sketcher?.selectedEntity) {
      const updatedEntity = sketcher.selectedEntity;

      updatedEntity.mConstructionPoints[0] = {
        x: centerX,
        y: centerY,
        z: centerZ
      };

      updatedEntity.updateRadius(radiusX, radiusY);
    }
  };

  useEffect(() => {
    if (sketcher?.selectedEntity) {
      const centerPoint = sketcher.selectedEntity?.mConstructionPoints[0];
      const lastPoint = sketcher.selectedEntity?.getLastConstructionPoint();

      const calculatedRadiusX = Math.abs(lastPoint.x - centerPoint.x);
      const calculatedRadiusY = Math.abs(lastPoint.z - centerPoint.z);

      setCenterX(centerPoint.x);
      setCenterY(centerPoint.y);
      setCenterZ(centerPoint.z);
      setRadiusX(calculatedRadiusX);
      setRadiusY(calculatedRadiusY);
      console.log(calculatedRadiusX)
    }
  }, [sketcher?.selectedEntity]);

  return (
    <>
      <Property name="Ellipse" />
      <div className='p-3 space-y-5'>
        <div>
          <div className='text-lg font-medium'>Center</div>
          <InputBox label={"x"} value={centerX} onChangeHandler={handleCenterChange("x")} />
          <InputBox label={"y"} value={centerY} onChangeHandler={handleCenterChange("y")} />
          <InputBox label={"z"} value={centerZ} onChangeHandler={handleCenterChange("z")} />
        </div>
        <div>
          <div className='text-lg font-medium'>Radius</div>
          <InputBox label={"Rx"} value={radiusX} onChangeHandler={handleRadiusChange("x")} />
          <InputBox label={"Ry"} value={radiusY} onChangeHandler={handleRadiusChange("y")} />
        </div>
      </div>

      <HorizontalButton name={"Update"} icon={<GrUpdate />} handleClick={handleUpdate} />
    </>
  );
}

export default EllipseProperties;
