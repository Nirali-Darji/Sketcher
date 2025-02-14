import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { SketcherContext } from "../Context/SketcherInstanceContext";

function OpacityBox() {
  const sketcher = useContext(SketcherContext);
  const [opacity, setOpacity] = useState(
    sketcher.selectedEntity?.mOpacity || 1
  );
  const [opacityPercentage, setOpacityPercentage] = useState(
    sketcher.selectedEntity
      ? Math.round(sketcher.selectedEntity.mOpacity * 100)
      : 100
  );

  const handleOpacityChange = (event) => {
    const value = parseFloat(event.target.value) / 100;
    setOpacity(value);
    setOpacityPercentage(Math.round(value * 100));

    if (sketcher.selectedEntity) {
      sketcher.selectedEntity.updateOpacity(value);
      //   sketcher.selectedEntity.update();
    }
  };

  useEffect(() => {
    if (sketcher?.selectedEntity) {
      console.log("Selected Entity:", sketcher.selectedEntity);
      console.log("Current Opacity:", sketcher.selectedEntity.mOpacity);
      setOpacity(sketcher.selectedEntity.mOpacity);
      setOpacityPercentage(Math.round(sketcher.selectedEntity.mOpacity * 100));
    }
  }, [sketcher?.selectedEntity]);

  return (
    <div className="p-3 space-y-5" key={sketcher.selectedEntity?.id}>
      <div className="text-lg font-medium">Opacity</div>
      <div className="flex gap-1 bg-gray-50 p-2 rounded-lg">
        <input
          value={opacityPercentage}
          onChange={handleOpacityChange}
          type="number"
          min="0"
          max="100"
          step="10"
        />
      </div>
    </div>
  );
}

export default observer(OpacityBox);
