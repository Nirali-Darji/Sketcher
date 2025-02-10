import { useEffect, useRef, useState } from "react";
import useThreeScene from "./hooks/useThreeScene";
import * as THREE from "three";
import ellipseStore from "./store/EllipseStore";

const Ellipses = () => {
  const canvasRef = useRef(null);
  const [raycaster] = useState(new THREE.Raycaster());
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);

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
      setStartPoint(point);
      ellipseStore.setCenterPoint(point.x, point.y, point.z);
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

    raycaster.setFromCamera(newMouse, camera);
    const planeMesh = scene.children.find(
      (child) =>
        child instanceof THREE.Mesh &&
        child.geometry instanceof THREE.PlaneGeometry
    );
    const intersects = raycaster.intersectObject(planeMesh);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      const distanceX = Math.abs(startPoint.x - point.x);
      const distanceY = Math.abs(startPoint.z - point.z);
      ellipseStore.updateRadii(distanceX, distanceY, scene);
    }
  };

  const onMouseUp = () => {
    if (!scene || !startPoint) return;

    setIsDrawing(false);
    ellipseStore.finalizeEllipse(scene);
    setStartPoint(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("pointerdown", onMouseDown);
    canvas.addEventListener("pointermove", onMouseMove);
    canvas.addEventListener("pointerup", onMouseUp);

    return () => {
      canvas.removeEventListener("pointerdown", onMouseDown);
      canvas.removeEventListener("pointermove", onMouseMove);
      canvas.removeEventListener("pointerup", onMouseUp);
    };
  }, [scene, camera, startPoint, isDrawing]);

  return (
    <>
      <canvas ref={canvasRef} />
      <div>
        <h2>Circles Drawn:</h2>
      </div>
    </>
  );
};

export default Ellipses;
