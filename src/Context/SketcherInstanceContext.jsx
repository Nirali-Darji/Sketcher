import { createContext, useState, useEffect } from "react";
import SketcherStore from "../store/SketcherStore";
import useThreeScene from "../hooks/useThreeScene";
import { useMouseEvents } from "../hooks/useMouseEvents";

const SketcherContext = createContext(null);

export function SketcherProvider({ children, canvasRef }) {
  const { scene, camera } = useThreeScene(canvasRef);
  const [sketcher, setSketcher] = useState(null);

  useEffect(() => {
    if (scene && camera) {
      const sketcherInstance = new SketcherStore(scene, camera);
      setSketcher(sketcherInstance);
    }
  }, [scene, camera]);
  useMouseEvents(canvasRef,sketcher);

  return (
    <SketcherContext.Provider value={sketcher}>
      {children}
    </SketcherContext.Provider>
  );
}

export { SketcherContext };