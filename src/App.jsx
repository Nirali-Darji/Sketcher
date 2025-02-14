import { observer } from "mobx-react";
import Navbar from "./Components/Navbar";
import LeftSide from "./Components/LeftSide";
import RightSide from "./Components/RightSide";
import { SketcherProvider } from "./Context/SketcherInstanceContext";
import { useRef } from "react";

function App() {
  const canvasRef = useRef(null);

  return (
    <>
      <SketcherProvider canvasRef={canvasRef}>
        <div className="min-h-screen flex min-w-[98.8vw] relative">
          <canvas className="absolute" ref={canvasRef} />
          <LeftSide />
          <Navbar />
          <RightSide />
        </div>
      </SketcherProvider>
    </>
  );
}

export default observer(App);
