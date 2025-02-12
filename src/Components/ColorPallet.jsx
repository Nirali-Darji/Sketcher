import React, { useEffect, useState } from 'react'


export default function ColorPallet() {
    const defaultColor = document.getElementById('colorInput')?.value || "RGB(0,0,0)";
    const [color, setColor] = useState(defaultColor);
    const hexToRgb = (hex) =>{
        hex = hex.replace('#', '');
        
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        
        return `RGB (${r}, ${g}, ${b})`;
    }
    
    // console.log(document.getElementById('colorInput')?.value);
      
   
    const colorChange = (e) =>{
        const changedColor = e.target.value;
        setColor(hexToRgb(changedColor));
    }
  return (
   <>
   <div className='p-3 space-y-5'>
    <div className='text-lg font-medium'>
        Color 
    </div>
    <div className='flex gap-1'>
        <input type='color' id='colorInput' onChange={colorChange}/>
        <div className='text-lg font-medium'>{color}</div>
    </div>
   </div>
   </>
  )
}
