// store/sketcherInstance.js
import SketcherStore from "./SketcherStore";
import { useThreeScene } from "../hooks/useThreeScene";

const { scene, camera } = useThreeScene();
export const sketcher = new SketcherStore(scene, camera);
