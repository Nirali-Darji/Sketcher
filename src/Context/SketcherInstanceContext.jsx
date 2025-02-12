import { createContext, useContext, useState, useEffect } from "react";
import SketcherStore from "../store/SketcherStore";
import useThreeScene from "../hooks/useThreeScene";

const SketcherContext = createContext(null);

export function SketcherProvider({ children }) {
  const { scene, camera } = useThreeScene();
  const [sketcher, setSketcher] = useState(null);

  useEffect(() => {
    if (scene && camera) {
      const sketcherInstance = new SketcherStore(scene, camera);
      setSketcher(sketcherInstance);
    }
  }, [scene, camera]);

  return (
    <SketcherContext.Provider value={sketcher}>
      {children}
    </SketcherContext.Provider>
  );
}

export {SketcherContext}

export function useSketcher() {
  const context = useContext(SketcherContext);

  if (!context) {
    console.error("useSketcher must be used within a SketcherProvider");
  }
  return context;
}
