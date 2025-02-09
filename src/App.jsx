import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { observer } from "mobx-react";
import pointStore from "./store/PointStore";
import useThreeScene from "./hooks/useThreeScene";

function App() {
  const canvasRef = useRef(null);
  const [raycaster] = useState(new THREE.Raycaster());
  const [mouse, setMouse] = useState(new THREE.Vector2());

  const { scene, camera, renderer } = useThreeScene();

  useEffect(() => {
    const animate = () => {
      if (scene && camera && renderer) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    };
    animate();
  }, [renderer, scene, camera]);

  useEffect(() => {
    if (mouse && scene && camera) {
      const raycaster = new THREE.Raycaster();
      const mouseVector = new THREE.Vector2(mouse.x, mouse.y);

      raycaster.setFromCamera(mouseVector, camera);

      const planeMesh = scene.children.find(
        (child) =>
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.PlaneGeometry
      );

      const intersects = raycaster.intersectObject(planeMesh);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        pointStore.addPoint(point.x, point.y, point.z, scene);
      }
    }
  }, [mouse, scene, camera]);

  const onMouseClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("click", onMouseClick);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("click", onMouseClick);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <div>
        <h2>Drawn Lines:</h2>
        <ul>
          {pointStore.lines.map((line, index) => (
            <li key={index}>
              Line {index + 1} between points:
              <span>
                {line.geometry.attributes.position.array[0].toFixed(2)},
                {line.geometry.attributes.position.array[1].toFixed(2)},
                {line.geometry.attributes.position.array[2].toFixed(2)}
              </span>{" "}
              to{" "}
              <span>
                {line.geometry.attributes.position.array[3].toFixed(2)},
                {line.geometry.attributes.position.array[4].toFixed(2)},
                {line.geometry.attributes.position.array[5].toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default observer(App);
