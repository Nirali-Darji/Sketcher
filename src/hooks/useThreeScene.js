import { useEffect, useState } from "react";
import * as THREE from "three";
import CameraControls from "camera-controls";

CameraControls.install({ THREE: THREE });

const useThreeScene = (canvasRef) => {
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [cameraControls, setCameraControls] = useState(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      return;
    }

    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    newCamera.position.set(0, 100, 0);
    newCamera.lookAt(0, 0, 0);

    const newRenderer = new THREE.WebGLRenderer({ canvas });
    newRenderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new CameraControls(newCamera, newRenderer.domElement);
    controls.mouseButtons.left = CameraControls.ACTION.NONE;
    controls.mouseButtons.right = CameraControls.ACTION.NONE;
    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
    setCameraControls(controls);

    const onResize = () => {
      newCamera.aspect = window.innerWidth / window.innerHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef]);

  useEffect(() => {
    const animate = () => {
      if (scene && camera && renderer && cameraControls) {
        requestAnimationFrame(animate);
        cameraControls.update();
        renderer.render(scene, camera);
      }
    };
    animate();
  }, [scene, camera, renderer, cameraControls]);

  return { scene, camera, cameraControls };
};

export default useThreeScene;
