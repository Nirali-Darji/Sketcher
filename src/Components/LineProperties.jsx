import { useContext, useState, useEffect } from 'react'
import Property from './Property'
import InputBox from './InputBox'
import { SketcherContext } from '../Context/SketcherInstanceContext';
import { observer } from 'mobx-react';
import HorizontalButton from './HorizontalButton';
import { GrUpdate } from 'react-icons/gr';
function LineProperties({name}) {
  const sketcher = useContext(SketcherContext);

  const [startX, setStartX] = useState(sketcher?.selectedEntity.mConstructionPoints[0].x);
  const [startY, setStartY] = useState(sketcher?.selectedEntity.mConstructionPoints[0].y);
  const [startZ, setStartZ] = useState(sketcher?.selectedEntity.mConstructionPoints[0].z);

  const [endX, setEndX] = useState(sketcher?.selectedEntity.getLastConstructionPoint().x);
  const [endY, setEndY] = useState(sketcher?.selectedEntity.getLastConstructionPoint().y);
  const [endZ, setEndZ] = useState(sketcher?.selectedEntity.getLastConstructionPoint().z);

  const handleStartChange = (axis) => (event) => {
    const value = parseFloat(event.target.value); 
    if (axis === "x") setStartX(value);
    if (axis === "y") setStartY(value);
    if (axis === "z") setStartZ(value);
  };

  const handleEndChange = (axis) => (event) => {
    const value = parseFloat(event.target.value); 
    if (axis === "x") setEndX(value);
    if (axis === "y") setEndY(value);
    if (axis === "z") setEndZ(value);
  };

  const handleUpdate = () => {
    if (sketcher?.selectedEntity) {

      const updatedEntity = sketcher.selectedEntity;
      updatedEntity.mConstructionPoints[0] = {
        ...updatedEntity.mConstructionPoints[0],
        x: startX,
        y: startY,
        z: startZ
      };
      const lastPoint = updatedEntity.getLastConstructionPoint();
      updatedEntity.mConstructionPoints[updatedEntity.mConstructionPoints.length - 1] = {
        ...lastPoint,
        x: endX,
        y: endY,
        z: endZ
      };
      sketcher.selectedEntity.setConstructionPoints(updatedEntity.mConstructionPoints);
      sketcher.selectedEntity.update();
    }

  };

  useEffect(() => {
    if (sketcher?.selectedEntity) {
      setStartX(sketcher.selectedEntity.mConstructionPoints[0].x);
      setStartY(sketcher.selectedEntity.mConstructionPoints[0].y);
      setStartZ(sketcher.selectedEntity.mConstructionPoints[0].z);

      const lastPoint = sketcher.selectedEntity.getLastConstructionPoint();
      setEndX(lastPoint.x);
      setEndY(lastPoint.y);
      setEndZ(lastPoint.z);
    }
  }, [sketcher?.selectedEntity]); 

  return (
    <>
      <Property name={name} />
      <div className='p-3 space-y-5'>
        <div>
          <div className='text-lg font-medium'>Starting Point</div>
          <InputBox label={"x"} value={startX} onChangeHandler={handleStartChange("x")} />
          <InputBox label={"y"} value={startY} onChangeHandler={handleStartChange("y")} />
          <InputBox label={"z"} value={startZ} onChangeHandler={handleStartChange("z")} />
        </div>
        <div>
          <div className='text-lg font-medium'>Ending Point</div>
          <InputBox label={"x"} value={endX} onChangeHandler={handleEndChange("x")} />
          <InputBox label={"y"} value={endY} onChangeHandler={handleEndChange("y")} />
          <InputBox label={"z"} value={endZ} onChangeHandler={handleEndChange("z")} />
        </div>
      </div>

   <HorizontalButton name={"Update"} icon={<GrUpdate />} handleClick={handleUpdate}/>
      
    </>
  );
}


export default observer(LineProperties);
