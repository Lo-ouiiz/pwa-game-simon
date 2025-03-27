import { useCallback, useEffect, useState } from 'react';
import './Simon.scss';
import Tile from './tile/Tile';

export type Color = 'red' | 'blue' | 'green' | 'yellow';

const colors: Color[] = ['red', 'blue', 'green', 'yellow'];

function Simon() {
  const [colorsSequence, setColorsSequence] = useState<Color[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [isPlayerTime, setIsPlayerTime] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  const startSimon = useCallback(() => {
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    setColorsSequence([firstColor]);
    setColorIndex(0);
    setIsPlayerTime(false);
  }, []);

  useEffect(() => {
    if (!isPlayerTime && colorsSequence.length > 0) {
      console.log('Machine');
      let index = 0;

      const showColor = () => {
        if (index < colorsSequence.length) {
          setActiveColor(colorsSequence[index]);

          setTimeout(() => {
            setActiveColor(null);
            index++;
          }, 500);

          setTimeout(() => {
            showColor();
          }, 1000);
        } else {
          setIsPlayerTime(true);
          console.log('Au joueur');
        }
      };

      showColor();
    }
  }, [colorsSequence, isPlayerTime]);

  useEffect(() => {
    if (colorsSequence.length > 0) {
      if (colorIndex === colorsSequence.length) {
        console.log('ajout couleur')
        setColorsSequence(prevSequence => [
          ...prevSequence,
          colors[Math.floor(Math.random() * colors.length)],
        ]);
        setTimeout(() => {
          setColorIndex(0);
          setIsPlayerTime(false);
        }, 2000);
      }
    }
  }, [colorsSequence, colorIndex]);  

  const handleClickButton = useCallback(
    (color: Color) => {
      if (!isPlayerTime) return;

      if (colorsSequence[colorIndex] === color) {
        setColorIndex(colorIndex + 1);
        console.log('augmentation index', colorIndex + 1);
      } else {
        alert('Perdu !');
        startSimon();
      }
    },
    [isPlayerTime, colorIndex, colorsSequence, startSimon]
  );

  return (
    <div className='mainContainer'>
      <button onClick={startSimon}>Démarrer</button>
      <div className='containerButtons'>
        <Tile color='red' active={activeColor === 'red'} onClick={handleClickButton} />
        <Tile color='blue' active={activeColor === 'blue'} onClick={handleClickButton} />
      </div>
      <div className='containerButtons'>
        <Tile color='green' active={activeColor === 'green'} onClick={handleClickButton} />
        <Tile color='yellow' active={activeColor === 'yellow'} onClick={handleClickButton} />
      </div>
    </div>
  );
}

export default Simon;
