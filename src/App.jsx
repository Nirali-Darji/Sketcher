import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import lineStore from "./store/LineStore";
import useThreeScene from "./hooks/useThreeScene";

function App() {
  const canvasRef = useRef(null);
  const [raycaster] = useState(new THREE.Raycaster());
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null); // Track start point

  // Initialize scene, camera, renderer with canvasRef
  const { scene, camera, renderer } = useThreeScene(canvasRef);

  // Animation loop
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
      setStartPoint(point); // Save the start point
      lineStore.setStartPoint(point.x, point.y, point.z);
      setIsDrawing(true);
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

    // Update temporary line
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

  const onMouseUp = () => {
    if (!scene || !startPoint) return;

    setIsDrawing(false);
    lineStore.finalizeLine(scene);
    setStartPoint(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("dblclick", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("dblclick", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
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
}

export default observer(App);
