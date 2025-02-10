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
  const [isDrawing, setIsDrawing] = useState(false);
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
      setStartPoint(point);
      setIsDrawing(true);
      onMouseDownCallback(point);
    }
  };

  const handleMouseMove = (event) => {
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
      onMouseMoveCallback(point);
    }
  };

  const handleMouseUp = () => {
    if (!scene || !startPoint) return;

    onMouseUpCallback();
  };

  const handleDoubleClick = () => {
    if (!scene || !startPoint) return;

    setIsDrawing(false);
    onDoubleClickCallback();
    setStartPoint(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("click", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("pointerup", handleMouseUp);
    canvas.addEventListener("dblclick", handleDoubleClick);

    return () => {
      canvas.removeEventListener("click", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("pointerup", handleMouseUp);
      canvas.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [scene, camera, startPoint, isDrawing]);

  return { isDrawing, startPoint };
};

export default useMouseEvents;
