import { useEffect, useState } from "react";
import useThreeScene from "./useThreeScene";
import SketcherStore from "../store/SketcherStore";

export default function useSketcher() {
  const { scene, camera } = useThreeScene();
  const [sketcher, setSketcher] = useState(null);

  useEffect(() => {
    if (scene && camera) {
      // console.log(scene);
      const sketcherInstance = new SketcherStore(scene, camera);
      setSketcher(sketcherInstance);
    }
  }, [scene, camera]);

  const canvas = document.querySelector("canvas");
  canvas?.addEventListener("pointerdown", sketcher?.onMouseDown);
  canvas?.addEventListener("pointermove", sketcher?.onMouseMove);
  canvas?.addEventListener("dblclick", sketcher?.onDoubleClick);
  canvas?.addEventListener("click", sketcher?.onClick);

  return sketcher;
}
