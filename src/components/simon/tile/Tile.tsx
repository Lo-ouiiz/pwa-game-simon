import { useCallback, useEffect, useState } from 'react';
import { Color } from '../Simon';
import '../Simon.scss'

interface TileProps {
  color: Color;
  active: boolean;
  onClick: (color: Color) => void;
}

function Tile({ color, active, onClick }: TileProps) {
  const [isTileClicked, setIsTileClicked] = useState(false);

  useEffect(() => {
    if (isTileClicked) {
      setTimeout(() => {
        setIsTileClicked(false);
      }, 500);
    }
  }, [isTileClicked])

  const handleClick = useCallback(() => {
    setIsTileClicked(true);
    onClick(color);
  }, [color, onClick]);

  return (
    <div 
      className={active || isTileClicked ? `button active ${color}` : `button ${color}` }
      onClick={handleClick}
    ></div>
  )
}

export default Tile
