import { enumOptions } from "./utils/EntityType";
import SketcherStore from "./store/SketcherStore";
import useThreeScene from "./hooks/useThreeScene";

function App() {
  const { scene, camera } = useThreeScene();

  const sketcher = new SketcherStore(scene, camera);
  const canvas = document.querySelector("canvas");
  canvas?.addEventListener("pointerdown", sketcher.onMouseDown);
  canvas?.addEventListener("mousemove", sketcher.onMouseMove);

  const handleClick = (e) => {
    sketcher.currentEntityType = e.target.value;
    sketcher.isSphereVisible = true;
  };

  return (
    <>
      {enumOptions.map((e) => (
        <button key={e.type} onClick={handleClick} value={e.type}>
          {e.type}
        </button>
      ))}
      <canvas />
    </>
  );
}

export default App;
