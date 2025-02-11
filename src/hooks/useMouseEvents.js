import { useEffect, useState } from "react";
import * as THREE from "three";

const useMouseEvents = (
  canvasRef,
  scene,
  camera,
  onMouseDownCallback,
  onMouseMoveCallback = null,
  onMouseUpCallback = null,
  onDoubleClickCallback = null
) => {
  const [raycaster] = useState(new THREE.Raycaster());
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [startPoint, setStartPoint] = useState(null);

  const handleMouseDown = (event) => {
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
      setStartPoint(point); // Set the start point
      onMouseDownCallback(point); // Trigger the callback
    }
  };

  const handleMouseMove = (event) => {
    if (!scene || !camera || !startPoint) return; // Only move if startPoint exists

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
      onMouseMoveCallback(point); // Trigger the callback
    }
  };

  const handleMouseUp = () => {
    if (!scene || !startPoint) return;

    setStartPoint(null); // Reset the start point
    onMouseUpCallback(); // Trigger the callback to finalize the line
  };

  const handleDoubleClick = () => {
    if (!scene || !startPoint) return;
    onDoubleClickCallback(); // Trigger the callback
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("pointerdown", handleMouseDown);
    canvas.addEventListener("pointermove", handleMouseMove);
    canvas.addEventListener("pointerup", handleMouseUp);
    canvas.addEventListener("dblclick", handleDoubleClick);

    return () => {
      canvas.removeEventListener("pointerdown", handleMouseDown);
      canvas.removeEventListener("pointermove", handleMouseMove);
      canvas.removeEventListener("pointerup", handleMouseUp);
      canvas.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [scene, camera, startPoint]); // Depend on startPoint

  return { startPoint };
};

export default useMouseEvents;
