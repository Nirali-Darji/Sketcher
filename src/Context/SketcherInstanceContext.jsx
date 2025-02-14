import { createContext, useState, useEffect } from "react";
import SketcherStore from "../store/SketcherStore";
import useThreeScene from "../hooks/useThreeScene";
import { useMouseEvents } from "../hooks/useMouseEvents";

const SketcherContext = createContext(null);

export function SketcherProvider({ children, canvasRef }) {
  const { scene, camera, cameraControls } = useThreeScene(canvasRef); // Get cameraControls
  const [sketcher, setSketcher] = useState(null);

  useEffect(() => {
    if (scene && camera && cameraControls) {
      const sketcherInstance = new SketcherStore(scene, camera, cameraControls); // Pass cameraControls to the store
      setSketcher(sketcherInstance);
    }
  }, [scene, camera, cameraControls]);

  useMouseEvents(canvasRef, sketcher);

  return (
    <SketcherContext.Provider value={sketcher}>
      {children}
    </SketcherContext.Provider>
  );
}

export { SketcherContext };
