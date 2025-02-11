import { useEffect, useState } from "react";
import * as THREE from "three";
const useThreeScene = () => {
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
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

    // const axesHelper = new THREE.AxesHelper(5);
    // newScene.add(axesHelper);
    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    const onResize = () => {
      newCamera.aspect = window.innerWidth / window.innerHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (scene && camera && renderer) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    };
    animate();
  }, [scene, camera, renderer]);

  return { scene, camera };
};

export default useThreeScene;
