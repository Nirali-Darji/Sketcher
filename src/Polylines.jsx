import { useEffect, useRef } from "react";
import useThreeScene from "./hooks/useThreeScene";
import lineStore from "./store/LineStore";
import { observer } from "mobx-react";
import useMouseEvents from "./hooks/useMouseEvents";

const Polylines = () => {
  const canvasRef = useRef(null);
  const { scene, camera, renderer } = useThreeScene(canvasRef);

  const onMouseDownCallback = (point) => {
    lineStore.setStartPoint(point.x, point.y, point.z);
  };

  const onMouseMoveCallback = (point) => {
    lineStore.updateLine(point.x, point.y, point.z, scene);
  };

  const onMouseUpCallback = () => {
    lineStore.finalizeLine(scene);
  };

  const onDoubleClickCallback = () => {
    lineStore.finalizeLine(scene);
  };

  const { isDrawing, startPoint } = useMouseEvents(
    canvasRef,
    scene,
    camera,
    onMouseDownCallback,
    onMouseMoveCallback,
    onMouseUpCallback,
    onDoubleClickCallback
  );

  useEffect(() => {
    const animate = () => {
      if (scene && camera && renderer) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    };
    animate();
  }, [scene, camera, renderer]);

  return (
    <>
      <canvas ref={canvasRef} />
      <div>
        <h2>Drawn Lines:</h2>
        <ul>
          {lineStore.lines.map((line, index) => (
            <li key={index}>
              Line {index + 1}: [
              {line.geometry.attributes.position.array[0].toFixed(2)} ,
              {line.geometry.attributes.position.array[1].toFixed(2)} ,
              {line.geometry.attributes.position.array[2].toFixed(2)}] to [
              {line.geometry.attributes.position.array[3].toFixed(2)} ,
              {line.geometry.attributes.position.array[4].toFixed(2)} ,
              {line.geometry.attributes.position.array[5].toFixed(2)}]
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default observer(Polylines);
