import { useEffect } from "react";

export const useMouseEvents = (canvasRef, sketcher) => {
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (sketcher && canvas) {
      canvas.addEventListener("pointerdown", sketcher.onMouseDown);
      canvas.addEventListener("pointermove", sketcher.onMouseMove);
      canvas.addEventListener("dblclick", sketcher.onDoubleClick);
      canvas.addEventListener("click", sketcher.onClick);
    }
  }, [sketcher, canvasRef]);
};
