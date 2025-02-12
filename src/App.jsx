// import { enumOptions } from "./utils/EntityType";

import { observer } from "mobx-react";
import useSketcher from "./hooks/useSketcher";
import Navbar from "./Components/Navbar";
import LeftSide from "./Components/LeftSide";
import RightSide from "./Components/RightSide";

function App() {
  const sketcher = useSketcher();
  return (
    <>
    <div className="min-h-screen flex min-w-[98.8vw] relative">
      <canvas className="absolute"/>
          <LeftSide sketcher={sketcher}/>
          <Navbar sketcher={sketcher}/>
          <RightSide />  
      </div>
    </>
  );
}

export default observer(App);
