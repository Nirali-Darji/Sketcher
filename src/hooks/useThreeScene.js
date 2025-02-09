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

    const planeGeo = new THREE.PlaneGeometry(10000, 10000, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    newScene.add(planeMesh);

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

  return { scene, camera, renderer };
};

export default useThreeScene;
