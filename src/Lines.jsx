import { useEffect, useRef, useState } from "react";
import useThreeScene from "./hooks/useThreeScene";
import lineStore from "./store/LineStore";
import * as THREE from "three";
import { observer } from "mobx-react";

const Lines = () => {
  const canvasRef = useRef(null);
  const [raycaster] = useState(new THREE.Raycaster());
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [startPoint, setStartPoint] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const { scene, camera, renderer } = useThreeScene(canvasRef);

  useEffect(() => {
    const animate = () => {
      if (scene && camera && renderer) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    };
    animate();
  }, [scene, camera, renderer]);

  const onMouseDown = (event) => {
    if (!scene || !camera) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newMouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    setMouse(newMouse);

    raycaster.setFromCamera(newMouse, camera);
    const planeMesh = scene.children.find(
      (child) =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.PlaneGeometry
    );
    const intersects = raycaster.intersectObject(planeMesh);

    if (intersects.length > 0) {
      const point = intersects[0].point;

      if (!isDrawing) {
        setStartPoint(point);
        lineStore.setStartPoint(point.x, point.y, point.z);
        setIsDrawing(true);
      } else {
        lineStore.finalizeLine(scene);
        setIsDrawing(false);
        setStartPoint(null);
      }
    }
  };

  const onMouseMove = (event) => {
    if (!scene || !camera || !isDrawing || !startPoint) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newMouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    setMouse(newMouse);

    raycaster.setFromCamera(newMouse, camera);
    const planeMesh = scene.children.find(
      (child) =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.PlaneGeometry
    );
    const intersects = raycaster.intersectObject(planeMesh);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      lineStore.updateLine(point.x, point.y, point.z, scene);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("click", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      canvas.removeEventListener("click", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [scene, camera, startPoint, isDrawing]);

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

export default observer(Lines);
