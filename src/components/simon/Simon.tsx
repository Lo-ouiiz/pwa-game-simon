import { useCallback, useEffect, useState } from 'react';
import './Simon.scss';
import Tile from './tile/Tile';

export type Color = 'red' | 'blue' | 'green' | 'yellow';

const colors: Color[] = ['red', 'blue', 'green', 'yellow'];

function Simon() {
  const [colorsSequence, setColorsSequence] = useState<Color[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const startSimon = useCallback(() => {
    setIsGameRunning(true);
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    setColorsSequence([firstColor]);
    setColorIndex(0);
    setIsPlayerTurn(false);
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && colorsSequence.length > 0) {
      console.log('Machine');
      let index = 0;

      const showColor = () => {
        if (index < colorsSequence.length) {
          setActiveColor(colorsSequence[index]);
          navigator.vibrate(500);

          setTimeout(() => {
            setActiveColor(null);
            index++;
          }, 500);

          setTimeout(() => {
            showColor();
          }, 1000);
        } else {
          setIsPlayerTurn(true);
          console.log('Au joueur');
        }
      };

      showColor();
    }
  }, [colorsSequence, isPlayerTurn]);

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
          setIsPlayerTurn(false);
        }, 2000);
      }
    }
  }, [colorsSequence, colorIndex]);  

  const handleClickButton = useCallback(
    (color: Color) => {
      if (!isPlayerTurn) return;

      if (colorsSequence[colorIndex] === color) {
        setColorIndex(colorIndex + 1);
        console.log('augmentation index', colorIndex + 1);
      } else {
        alert('Perdu !');
        setIsGameRunning(false);
      }
    },
    [isPlayerTurn, colorIndex, colorsSequence]
  );

  return (
    <div className='mainContainer'>
      <h1>Jeu du Simon</h1>
      <div className='containerButtons'>
        <Tile color='red' active={activeColor === 'red'} onClick={handleClickButton} />
        <Tile color='blue' active={activeColor === 'blue'} onClick={handleClickButton} />
      </div>
      <div className='containerButtons'>
        <Tile color='green' active={activeColor === 'green'} onClick={handleClickButton} />
        <Tile color='yellow' active={activeColor === 'yellow'} onClick={handleClickButton} />
      </div>
      {!isGameRunning && <button className='startButton' onClick={startSimon}>Démarrer une partie</button>}
    </div>
  );
}

export default Simon;
