import { useContext, useState, useEffect } from 'react';
import { SketcherContext } from '../Context/SketcherInstanceContext';
import Property from './Property';
import InputBox from './InputBox';
import HorizontalButton from './HorizontalButton';
import { GrUpdate } from 'react-icons/gr';

function PollyLineProperties() {
  const sketcher = useContext(SketcherContext);

  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (sketcher?.selectedEntity?.mConstructionPoints) {
      const initialPoints = sketcher.selectedEntity.mConstructionPoints.map(point => ({
        x: point.x,
        y: point.y,
        z: point.z
      }));
      setPoints(initialPoints);
    }
  }, [sketcher?.selectedEntity]);
  const handlePointChange = (index, axis) => (event) => {
    const newPoints = [...points];
    newPoints[index][axis] = parseFloat(event.target.value); // Update the specific axis value
    setPoints(newPoints);
  };

  const handleUpdate = () => {
    if (sketcher?.selectedEntity) {
      const updatedPoints = points.map(point => ({
        ...point,
        x: isNaN(point.x) ? 0 : point.x,
        y: isNaN(point.y) ? 0 : point.y,
        z: isNaN(point.z) ? 0 : point.z,
      }));

      sketcher.selectedEntity.mConstructionPoints = updatedPoints.map((point, index) => ({
        x: point.x,
        y: point.y,
        z: point.z,
      }));

      sketcher.selectedEntity.update();
    }
  };

  return (
    <>
      <Property name="Polyline" />
      <div className='p-3 space-y-5'>
        {
          points.slice(0, points.length - 2).map((point, index) =>  (
            <div key={index}>
              <div className='text-lg font-medium'>Point {index + 1}</div>
              <InputBox label={"x"} value={point.x} onChangeHandler={handlePointChange(index, "x")} />
              <InputBox label={"y"} value={point.y} onChangeHandler={handlePointChange(index, "y")} />
              <InputBox label={"z"} value={point.z} onChangeHandler={handlePointChange(index, "z")} />
            </div>
          ))
        }
      </div>
      <HorizontalButton name={"Update"} icon={<GrUpdate />} handleClick={handleUpdate} />
    </>
  );
}

export default PollyLineProperties;
