import  { useContext, useEffect, useState } from 'react'
import { SketcherContext } from '../Context/SketcherInstanceContext';
import { observer } from 'mobx-react';


function ColorPallet() {
    
    const sketcher = useContext(SketcherContext);
    const hexToRgb = (hex) =>{
        hex = hex.replace('#', '');
        
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        
        return `RGB (${r}, ${g}, ${b})`;
    }
    const [color, setColor] = useState(hexToRgb(sketcher.selectedEntity?.mColor));
    const [changeColor, setChangeColor] = useState(sketcher.selectedEntity?.mColor);

    useEffect(() =>{
        if(sketcher) 
            {
                setColor(hexToRgb(sketcher.selectedEntity?.mColor));
                setChangeColor(sketcher.selectedEntity?.mColor);
                console.log(changeColor);
            }
    },[changeColor, sketcher, sketcher.selectedEntity]);


    const colorChange = (e) =>{
        const changedColor = e.target.value;
        sketcher?.selectedEntity?.setColor(changedColor);
        console.log(hexToRgb(changedColor));
        setColor(hexToRgb(changedColor));
        setChangeColor(changedColor)
    }
  return (
   <>
   <div className='p-3 space-y-5'>
    <div className='text-lg font-medium'>
        Color 
    </div>
    <div className='flex gap-1'>
        <input type='color' id='colorInput' value={changeColor} onChange={colorChange}/>
        <div className='text-lg font-medium'>{color}</div>
    </div>
   </div>
   </>
  )
}


export default observer(ColorPallet)